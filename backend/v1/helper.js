var helper = {};

helper.helperFindArtistNumberIdByTokenId = async function (tokenIdArray) {
  let tokenId = tokenIdArray[0]; // only need the first tokenid
  let firstChar = tokenId.toString()[0];
  let firstCharAsNumber = parseInt(firstChar); //convert back to nr
  return firstCharAsNumber * 1000;
};

module.exports = helper;
