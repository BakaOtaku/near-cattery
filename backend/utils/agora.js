const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const appID = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_APP_CERT;
const expirationTimeInSeconds = 3600
const currentTimestamp = Math.floor(Date.now() / 1000)
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

const genRtcTokenUser = async (channelName, account = 1, role) => {
  console.log(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
  let urole = RtcRole.PUBLISHER;
  if (role === 'publisher') {
    urole = RtcRole.PUBLISHER;
  } else if (role === 'subscriber') {
    urole = RtcRole.SUBSCRIBER;
  }
  const token = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, urole, privilegeExpiredTs);
  console.log("Token With UserAccount: " + token);
  return token;
}

const genRtcTokenId = async (channelName, uid = 1, role) => {
  let urole = RtcRole.PUBLISHER;
  if (role === 'publisher') {
    urole = RtcRole.PUBLISHER;
  } else if (role === 'subscriber') {
    urole = RtcRole.SUBSCRIBER;
  }
  const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, urole, privilegeExpiredTs);
  console.log("Token With Integer Number Uid: " + token);
  return token;
}

module.exports = {
  genRtcTokenUser,
  genRtcTokenId
}