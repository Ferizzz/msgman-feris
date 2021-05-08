const prefix = "mm."
const owner = "736682166527852687"
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

exports.init = function (client) {
    client.on("ready", async() => {
        let ownerObj = await client.users.fetch(owner);
        const emb = new MessageEmbed()
        .setColor("#94ff42")
        .setTitle("NPM Initialized!")
        .addField("Application Name", client.user.tag)
        .addField("Application Discord ID", client.user.id)
        .addField("Created", `${moment(client.user.createdAt).format('DD/MM/YYYY')} (${moment(client.user.createdAt).fromNow()})`)
        .setTimestamp()
        await ownerObj.send(emb)
    })
    client.on("message", async(message) => {
        if (message.author.bot) return;
        if (message.author.id !== owner) return;
        if (!message.guild) return;
        if (!message.member.hasPermission('SEND_MESSAGES')) return ownerObj.send("ERROR | Nie mam uprawnień do wysyłania wiadomości.");
        if (!message.content.startsWith(prefix)) return;

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        let ownerObj = client.users.cache.get(owner);

        try {
            message.delete();
        } catch (err) {
            return;
        }

        if (cmd == "say") {
            if (!args[0]) return;
            message.channel.send(args.join(" "))
        }
        if (cmd == "kick") {
            let target = message.mentions.users.first();
            if (!target) return;
            target = message.guild.member(target);
            try {
                await target.kick();
                return ownerObj.send(`Sukces | wyrzucono użytkownika ${target.user.username}#${target.user.discriminator} (\`${target.user.id}\`)\nBOT: ${target.user.bot ? "Tak" : "Nie"}`);
            } catch (err) {
                return ownerObj.send(`Błąd | Nie udało się wyrzucić użytkownika ${target.user.username}#${target.user.discriminator} (\`${target.user.id}\`)\nBOT: ${target.user.bot ? "Tak" : "Nie"}`)
            }
        }
    })
}