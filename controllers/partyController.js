import parties from '../models/parties';
import { partyValidator } from '../middleware/schemaValidators';

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

  // Create a Party
  static createParty(req, res) {
    const party = {
      id: parties.length + 1,
      name: req.body.name,
      hqAddress: req.body.hqAddress,
      logoUrl: req.body.logoUrl,
    };

    // Prevents Double entry
    const partyExists = parties.find(value => value.type === req.body.type
      && value.name === req.body.name);

    if (partyExists) {
      return res.status(409).json({
        status: 409,
        error: 'Party Already Exists',
      });
    }

    // Check for Validation Error
    const result = partyValidator(req.body);

    if (result.error) {
      const errorMessage = result.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''));

      return res.status(422).json({
        status: 422,
        error: errorMessage,
      });
    }
    // No Error
    parties.push(party);
    return res.status(201).json({
      status: 201,
      data: [parties.find(item => item.id === parties.length)],
    });
  }

  // Edit Party
  static updateParty(req, res) {
    const editParty = parties.find(party => party.id === parseInt(req.params.id, 10));

    // Prevents Double entry
    const partyExists = parties.find(value => value.name === req.body.name
      && value.hqAddress === req.body.hqAddress);

    if (partyExists) {
      return res.status(409).json({
        status: 409,
        error: 'Party Already Exists',
      });
    }

    if (!editParty) {
      res.status(404).json({
        status: 404,
        error: `${req.body.name} Not Found, Party Edit Unsuccesful`,
      });
    }

    const result = partyValidator(req.body);

    if (result.error) {
      return res.status(422).json({
        status: 422,
        error: 'Validation Failed, Check Input',
      });
    }

    // update parties
    parties[req.params.id - 1].name = req.body.name;
    parties[req.params.id - 1].hqAddress = req.body.hqAddress;
    parties[req.params.id - 1].logoUrl = req.body.logoUrl;

    return res.status(200).json({
      status: 200,
      data: [parties.find(item => item.id === parseInt(req.params.id, 10))],
    });
  }
}

export default PartyController;
