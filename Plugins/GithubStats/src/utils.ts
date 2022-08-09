export async function getUserInfo(username: string) {
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url);
    const json = await response.json();

    if (json?.message) {
        return {
            title: "Error :(",
            description: json.message,
            color: 0xFF0000,
        };
    }

    const { name, html_url, bio, avatar_url, public_repos, public_gists, followers, following, id, created_at } = json;
    var created_date = new Date(created_at).getTime() / 1000;

    const embed = {
        type: "rich",
        color: 0x0099ff,
        title: name,
        url: html_url,
        description: bio,
        thumbnail: {
            proxy_url: avatar_url,
            url: avatar_url,
            width: 512,
            height: 512
        },
        fields: [
            {
                name: 'Created At',
                value: `<t:${created_date}:f>`,
                inline: true,
            },
            {
                name: 'Public Repos',
                value: `${public_repos}`,
                inline: true,
            },
            {
                name: 'Public gists',
                value: `${public_gists}`,
                inline: true,
            },
            {
                name: 'Followers',
                value: `${followers}`,
                inline: true,
            },
            {
                name: 'Following',
                value: `${following}`,
                inline: true,
            }
        ],
        timestamp: new Date(),
        footer: {
            text: id
        }
    }

    return embed;
}

export async function getRepoInfo(username: string, repo: string) {
    const url = `https://api.github.com/repos/${username}/${repo}`;
    const response = await fetch(url);
    const json = await response.json();

    if (json?.message) {
        return {
            title: "Error :(",
            description: json.message,
            color: 0xFF0000,
        };
    }

    const { name, html_url, description, owner, created_at, updated_at, language, topics, subscribers_count, id } = json;
    var created_date = new Date(created_at).getTime() / 1000;
    var updated_date = new Date(updated_at).getTime() / 1000;

    const embed = {
        type: "rich",
        color: 0x0099ff,
        title: name,
        url: html_url,
        description: description,
        thumbnail: {
            proxy_url: owner['avatar_url'],
            url: owner['avatar_url'],
            width: 512,
            height: 512
        },
        fields: [
            {
                name: 'Created At',
                value: `<t:${created_date}:f>`,
                inline: true,
            },
            {
                name: 'Updated At',
                value: `<t:${updated_date}:f>`,
                inline: true,
            },
            {
                name: 'Language',
                value: `${language}`,
                inline: true,
            },
            {
                name: 'Topics',
                value: `${topics.length > 0 ? topics.join(', ') : 'None'}`,
                inline: true,
            },
            {
                name: 'Subscribers',
                value: `${subscribers_count}`,
                inline: true,
            }
        ],
        timestamp: new Date(),
        footer: {
            text: id
        }
    }

    return embed;
}