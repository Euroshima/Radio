const Discord = require('discord.js');
const client  = new Discord.Client();
const prefix = "!";


client .login('NjA0MTM1NzQyMzg5ODc4ODIw.XTpuLg.PXaDM1GazSQfugWdSzet2fKM9_o')

client .on('ready', () => {
    console.log('I am ready!');
    setInterval(function () {
        let date = new Date();
        let jour = date.getDay();
        let heure = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (heure === 0 && minutes === 0){
            console.log('ok')
            // Send the message to a designated channel on a server:
            const channel = client.channels.find(ch => ch.name === 'radio');
            // Do nothing if the channel wasn't found on this server
            if (!channel){
                //crée le salon si il n'existe pas
                client.guild.createChannel('radio').then(channel => {
                    channel.setTopic('la radio du jours')
                })
                return;
            }
            // Send the message, mentioning the member
            channel.send(`Bonjour @everyone, la radio du jours "${generatePassword()}" la radio sera changer à 0H00 `);
        }
    },60000);
});
function generatePassword() {
    let length = 5,
        charset = "0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
//delete all message
client .on("message", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "clearchat")) {
        async function clear() {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({limit: 99});
            msg.channel.bulkDelete(fetched);
        }
        clear();
    }
});


