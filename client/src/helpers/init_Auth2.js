import {gapi} from 'gapi-script';

export default function initAuth2Google(){
  function start(){
    gapi.client.init({
      clientId: "804485400642-ql0oec6nnarp74n4keo22bq9ou539gme.apps.googleusercontent.com",
      scope: ""
    })
  }
  gapi.load('client:auth2', start)
}