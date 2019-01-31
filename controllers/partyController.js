import parties from '../models/parties';

class PartyController {
  // Get all Party
  static getAllParties(req, res) {
    return res.status(200)
      .json({
        status: 200,
        data: parties,
      });
  }

  // Get a Particular Party
  static getAParty(req, res) {
    const findParty = parties.find(party => party.id === parseInt(req.params.id, 10));

    if (!findParty) {
      return res.status(404)
        .json({
          status: 404,
          error: 'Party Not Found',
        });
    }

    return res.status(200)
      .json({
        status: 200,
        data: [findParty],
      });
  }
}

export default PartyController;
