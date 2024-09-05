const mongoose = require('mongoose');

const knowledgeCentreSchema = new mongoose.Schema({
  category:{
    type: String,
    required: [true, 'Category is required']
  },
  knowlegeCentreIcon:{
    type: String,
    
  },
  knowledgeCentreHeader:{
    type: String,
    
  },
  short_Description:{
    type: String,
    
  },
  knowledge_Header:{
    type: String,
    
  },
  knowledge_HeaderMetatag:{
    type: String,
    
  },
  knowledgeArticle_Header:{
    type: String,
    required: [true, 'Knowledge article header is required']
  },
  lHS_key_Image:{
    type: String,
    
  },
  lHs_metatag:{
    type: String,
  },
  bullet1_text:{
    type: String,
    
  },
  bullet1_description:{
    type: String,
    
  },
  bullet1_Img:{
    type: String,
    
  },
  bullet1_metadata:{
    type: String
  },
  bullet2_text:{
    type: String,
    
  },
  bullet2_description:{
    type: String,
    
  },
  bullet2_Img:{
    type: String,
    
  },
  bullet2_metadata:{
    type: String
  },
  bullet3_text:{
    type: String,
    
  },
  bullet3_description:{
    type: String,
    
  },
  bullet3_Img:{
    type: String,
    
  },
  bullet3_metadata:{
    type: String
  },
  bullet4_text:{
    type: String,
    
  },
  bullet4_description:{
    type: String,
    
  },
  bullet4_Img:{
    type: String,
    
  },
  bullet4_metadata:{
    type: String
  },
  bullet5_text:{
    type: String,
    
  },
  bullet5_description:{
    type: String,
    
  },
  bullet5_Img:{
    type: String,
    
  },
  bullet5_metadata:{
    type: String
  },

})


const knowledgeCentreModel = mongoose.model('KnowlegeCentre', knowledgeCentreSchema);


module.exports = knowledgeCentreModel;