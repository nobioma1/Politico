import db from '../db';
import auth from '../middleware/auth';

class VoteController {
  /**
   * @static
   * @param {*} req Request, contains Params office id and candidate id
   * @param {*} res Response, An Object containing status, and data {office, candidate}
   *
   * - Votes a Candidate for a particular office
   * @memberof VoteController
   */
  static async vote(req, res) {
    // gets the id of the current user in the token passed
    const { userId } = auth.tokenBearer(req);

    // gets office and candidate id from the request
    const { office, candidate } = req.body;

    const votedQuery = 'SELECT * from votes WHERE voter = $1 AND office = $2';
    const voteQuery = 'INSERT INTO votes(candidate, office, voter) VALUES ($1, $2, $3) RETURNING *';


    try {
      const voted = await db.query(votedQuery, [userId, office]);

      if (voted.rows.length !== 0) {
        return res.status(409).send({
          status: 409,
          error: 'You have voted for this office',
        });
      }

      // persists data to database
      const { rows } = await db.query(voteQuery, [candidate, office, userId]);
      return res.status(201).send({
        status: 201,
        data: {
          office: voted.rows[0],
          candidate: rows[0].candidate,
          voter: rows[0].voter,
        },
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.message,
      });
    }
  }

  /**
   * @static
   * @param {*} req Request, contains Params current user
   * @param {*} res Response, an Object containing status, and data(array) of votes by a user {name, office}
   *
   * - To get the names and office a particular user have voted before
   * @memberof VoteController
   */
  static async userVoted(req, res) {
    // gets all votes where voter is the current user id
    const userVotedQuery = 'SELECT * from votes WHERE voter=$1';
    // Joins the users table with vote table. Selecting the firstname and lastname where userID and candidate match
    const votedCandidatesQuery = 'SELECT user_id, firstname, lastname FROM users RIGHT OUTER JOIN votes on users.user_id=votes.candidate';
    // Joins the offices table with vote table. Selecting the office and type where votes office and office id match
    const votedOfficesQuery = 'SELECT office_id, type, name FROM offices RIGHT OUTER JOIN votes on offices.office_id=votes.office';
    const userVotedArray = [];

    try {
      const userVoted = await db.query(userVotedQuery, [req.params.user]);
      const votedCandidates = await db.query(votedCandidatesQuery);
      const votedOffices = await db.query(votedOfficesQuery);

      // Assign names and office to the vote object where IDs match
      userVoted.rows.forEach((vote) => {
        const foundOffice = votedOffices.rows.find(office => office.office_id === vote.office);
        const foundCandidate = votedCandidates.rows.find(candidate => candidate.user_id === vote.candidate);
        userVotedArray.push({ voteId: vote.vote_id, office: foundOffice, candidate: foundCandidate });
      });

      return res.status(200).send({
        status: 200,
        data: userVotedArray,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.message,
      });
    }
  }
}

export default VoteController;
