import parties from '../models/parties';

class PartyController {
  // To Get all Party
  static getAllParties(req, res) {
    return res.status(200).json({
      success: 200,
      data: parties
    });
  }
}

module.exports = PartyController;
