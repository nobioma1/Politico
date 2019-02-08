import db from '../db';
import { voteValidator } from '../middleware/schemaValidators';
import auth from '../middleware/auth';


class VoteController {
  static async vote(req, res) {
    // validates the request from the consumer
    const validate = voteValidator(req.body);
    if (validate.error) {
      const errorMessage = validate.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''));
      return res.status(422).json({
        status: 422,
        error: errorMessage,
      });
    }

    // gets the id of the current user in the token passed
    const { userId } = auth.tokenBearer(req);


    const { office, candidate } = req.body;

    const votedQuery = 'SELECT * from votes WHERE voter = $1 AND office = $2 AND candidate = $3 ';
    const candidatesQuery = 'SELECT * from candidates';
    const officesQuery = 'SELECT * from offices';

    const voteQuery = 'INSERT INTO votes(candidate, office, voter) VALUES ($1, $2, $3) RETURNING *';
    const values = [candidate, office, userId];

    const candidatesList = await db.query(candidatesQuery);
    const officesList = await db.query(officesQuery);
    if (candidatesList.rowCount < candidate || officesList.rowCount < office) {
      return res.status(409).send({ error: 'candidate or office not existent' });
    }

    try {
      const voted = await db.query(votedQuery, [userId, office, candidate]);

      if (voted) {
        if (voted.rows[0] !== undefined) {
          if (voted.rows[0].candidate === parseInt(candidate, 10) && voted.rows[0].office === parseInt(office, 10)) {
            return res.status(409).send({ error: 'you have voted for the candidate' });
          }
        }
      }

      const { rows } = await db.query(voteQuery, values);
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
}

export default VoteController;
