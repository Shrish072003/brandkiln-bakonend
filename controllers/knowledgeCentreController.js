const knowledgeCentreModel = require('../models/knowledgeCentreModel');
const upload = require('../middlewares/multerConfig'); // Assuming multer config is in 'middlewares/multerConfig.js'

// Controller to create a new Knowledge Centre entry
const createKnowledgeCentre = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    } else {
      try {
        const {
          category,
          knowledgeCentreHeader,
          short_Description,
          knowledge_Header,
          knowledge_HeaderMetatag,
          knowledgeArticle_Header,
          lHs_metatag,
          bullet1_text,
          bullet1_description,
          bullet1_metadata,
          bullet2_text,
          bullet2_description,
          bullet2_metadata,
          bullet3_text,
          bullet3_description,
          bullet3_metadata,
          bullet4_text,
          bullet4_description,
          bullet4_metadata,
          bullet5_text,
          bullet5_description,
          bullet5_metadata
        } = req.body;

        // Construct the new knowledge centre object
        const newKnowledgeCentre = new knowledgeCentreModel({
          category,
          knowlegeCentreIcon: req.files['knowlegeCentreIcon'] ? req.files['knowlegeCentreIcon'][0].path : null,
          knowledgeCentreHeader,
          short_Description,
          knowledge_Header,
          knowledge_HeaderMetatag,
          knowledgeArticle_Header,
          lHS_key_Image: req.files['lHS_key_Image'] ? req.files['lHS_key_Image'][0].path : null,
          lHs_metatag,
          bullet1_text,
          bullet1_description,
          bullet1_Img: req.files['bullet1_Img'] ? req.files['bullet1_Img'][0].path : null,
          bullet1_metadata,
          bullet2_text,
          bullet2_description,
          bullet2_Img: req.files['bullet2_Img'] ? req.files['bullet2_Img'][0].path : null,
          bullet2_metadata,
          bullet3_text,
          bullet3_description,
          bullet3_Img: req.files['bullet3_Img'] ? req.files['bullet3_Img'][0].path : null,
          bullet3_metadata,
          bullet4_text,
          bullet4_description,
          bullet4_Img: req.files['bullet4_Img'] ? req.files['bullet4_Img'][0].path : null,
          bullet4_metadata,
          bullet5_text,
          bullet5_description,
          bullet5_Img: req.files['bullet5_Img'] ? req.files['bullet5_Img'][0].path : null,
          bullet5_metadata
        });

        // Save the new knowledge centre entry
        await newKnowledgeCentre.save();

        // Send a success response
        res.status(201).json({ msg: 'Knowledge Centre entry created successfully' });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
    }
  });
};

// Controller to get all Knowledge Centre entries
const getAllKnowledgeCentres = async (req, res) => {
  try {
    const knowledgeCentres = await knowledgeCentreModel.find({});
    if (!knowledgeCentres || knowledgeCentres.length === 0) {
      return res.status(404).json({ msg: 'No knowledge centre entries found' });
    }
    res.status(200).json({
      success: true,
      data: knowledgeCentres
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
// Controller to get all Knowledge Centre entries
const getAllKnowledgeCentresforfrontend = async (req, res) => {
  try {
    const knowledgeCentres = await knowledgeCentreModel.find({});
    if (!knowledgeCentres || knowledgeCentres.length === 0) {
      return res.status(404).json({ msg: 'No knowledge centre entries found' });
    }
    res.status(200).json({
      success: true,
      data: knowledgeCentres
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Controller to get a Knowledge Centre entry by ID
const getKnowledgeCentreById = async (req, res) => {
  try {
    const knowledgeCentre = await knowledgeCentreModel.findById(req.params.id);
    if (!knowledgeCentre) {
      return res.status(404).json({ msg: 'Knowledge Centre entry not found' });
    }
    res.status(200).json({
      success: true,
      data: knowledgeCentre
    });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Knowledge Centre entry not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createKnowledgeCentre,
  getAllKnowledgeCentres,
  getAllKnowledgeCentresforfrontend,
  getKnowledgeCentreById
};
