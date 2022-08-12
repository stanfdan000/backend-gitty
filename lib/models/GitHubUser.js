const pool = require('../utils/pool');

module.exports = class GitHubUser {
  id;
  userName;
  email;
  avatar;


  constructor(row) {
    this.id = row.id;
    this.userName = row.userName;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async insert({ userName, email, avatar }) {
    if (!userName) throw new Error('user name required');

    const { rows } = await pool.query(
      `
            INSERT INTO github_users (username, email, avatar)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
      [userName, email, avatar]

    );
    return new GitHubUser(rows[0]);
  }

  static async findByUserName(userName) {
    const { rows } = await pool.query(
      `
        SELECT * FROM github_users
        WHERE username=$1
        `,
      [userName]
    );
    if (!rows[0]) return null;
    return new GitHubUser(rows[0]);
  }

  toJSON() {
    return { ...this };
  }

};
