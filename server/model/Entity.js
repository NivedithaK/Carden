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
    ParentID: {
        type: String,
        default: ""
    },
    level:{
        type: Int,
        default:0
    },
    //Set to null if no bgcolor
    bgColor: {
        type: String,
        default: ""
    },
    size: {
        type: Int,
        default: 10
    }
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

const ButtonField = Entity.discriminator('Button',
  new Schema({
      onClick : {
        type: String,
        default: "",
      },
      type: {
          type: String,
          default: ""
      }
  }));

const BoxField = Entity.discriminator('Box',
  new Schema({
      onClick : {
        type: String,
        default: "",
      },
      type: {
          type: String,
          default: ""
      }
  }));
export default {TextField, ImgField, AudField, VidField, ButtonField, BoxField};