import mongoose from 'mongoose';
const model = mongoose.model;

const Schema = mongoose.Schema;

const entitySchema = new Schema({
    location: {
        type: String,
        default: ""
    },
    Animation: {
        type: String,
        default: ""
    },
}, { discriminatorKey: 'kind' });

const Entity = mongoose.model('Entity', entitySchema);

const TextField = Entity.discriminator('Text',
  new Schema({ 
      font: {
          type: String,
          default: "",
      },
      fontsize: {
          type: Number,
          default: 12,
      },
      colour: {
          type: String,
          default: "",
      },
      content: {
          type: String,
          default: "",
      }
      }));

const ImgField = Entity.discriminator('Image',
  new Schema({ 
      s3_id : {
        type: String,
        default: "",
      },
      link: {
          type: String,
          default: "",
      },
    }));

const AudField = Entity.discriminator('Audio',
  new Schema({
      s3_id : {
        type: String,
        default: "",
      },
      link: {
          type: String,
          default: ""
      },
  }));

const VidField = Entity.discriminator('Video',
  new Schema({
      s3_id : {
        type: String,
        default: "",
      },
      link: {
          type: String,
          default: ""
      },
  }));

export default {TextField, ImgField, AudField, VidField};