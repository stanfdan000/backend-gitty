const exchangeCodeForToken = async (code) => {
  return `MOCK_TOKEN_FOR_CODE${code}`;
};

const getGitHubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGitHubProfile(${token})`);
  return {
    login: 'fake_github_user',
    avatar: 'https://www.placecage.com/gif/300/300',
    email: '100@example.com'
  };

};

module.exports = { exchangeCodeForToken, getGitHubProfile };

