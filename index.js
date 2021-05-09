const prefix = "mm."

exports.init = function (client, ownersID, logging) {
    if(!ownersID) return console.log("You didn't provide owners id (second argument)")
    console.log(`msgman-feris | Prefix: \"${prefix}\"`)
    client.on("message", async(message) => {
        if (message.author.bot) return;
        if (!ownersID.includes(message.author.id)) return;
        if (!message.guild) return;
        if (!message.member.hasPermission('SEND_MESSAGES')) return;
        if (!message.content.startsWith(prefix)) return;

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        try {
            message.delete();
        } catch (err) {
            return;
        }

        if (cmd == "say") {
            if (!args[0]) return message.member.send("You didn't provide any arguments!");
            message.channel.send(args.join(" "))
        }
        if (cmd == "kick") {
            let target = message.mentions.users.first();
            if (!target) return  message.member.send("You didn't provide argument!");;
            target = message.guild.member(target);
            try {
                await target.kick();
                if(logging) {
                    console.log(`Successfully kicked ${target.user.username}#${target.user.discriminator} (\`${target.user.id}\`)`)
                }
            } catch (err) {
                if(logging) {
                    console.log(`Error | I can't kick ${target.user.username}#${target.user.discriminator} (\`${target.user.id}\`)`)
                }
            }
        }
    })
}