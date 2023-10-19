const Discord = require("discord.js");

module.exports = {
  name: 'rolar-dados',
  description: 'Rola um ou mais dados com o número de lados especificado.',
  options: [
    {
      name: 'lados',
      description: 'Número de lados do dado (padrão é 20).',
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: 'quantidade',
      description: 'Número de dados a serem rolados (padrão é 1).',
      type: Discord.ApplicationCommandOptionType.Integer,
      required: false,
    },
    {
      name: 'soma',
      description: 'Número a ser somado ao resultado da rolagem.',
      type: Discord.ApplicationCommandOptionType.Integer,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const sides = interaction.options.getInteger('lados') || 20;
    const quantity = interaction.options.getInteger('quantidade') || 1;
    const sum = interaction.options.getInteger('soma') || 0;
    let total = 0;
    let resultado = 0;
    let results = [];

    for (let i = 0; i < quantity; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
         //await interaction.followUp('Tinha caido o numero proibido, mas substituimos ele por um numero melhor **22**! **22** é Bolsonaro!');
      results.push(roll);
      total += roll;
    }

    total += sum;
    
    // Ordena os resultados do maior para o menor
    results.sort((a, b) => b - a);

    const maxResult = results[0];
    const maxResultIndex = results.indexOf(maxResult);
    results.splice(maxResultIndex, 1, `**${maxResult}**`); // Coloca o maior resultado em negrito

    const resultsString = results.join(', ');
    let response = `Você rolou ${quantity} dado(s) de ${sides} lados e os resultados foram: ${resultsString}.`;

    if (quantity > 1) {
      response += `\nTotal (incluindo soma): ${total} (${sum} somado)`;
    } else {
      response += `\nTotal: ${total} (**+${sum}** ${maxResult})`;
    };

    for (let i = 0; i < quantity; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      results.push(roll);
      resultado = maxResult;
    }
    resultado += sum;

    const corRoxa = parseInt('800080', 16);
    const embed = new Discord.EmbedBuilder()
        .setColor(corRoxa)
        .setTitle(`:game_die:Quantidade: ${quantity}`)
        .setAuthor({ name: 'Malditos Dados', iconURL: 'https://cdn.icon-icons.com/icons2/3399/PNG/512/bot_icon_214984.png', url: 'https://ordemparanormal.com.br' })
    	.setThumbnail('https://media.tenor.com/2wQ0Lj2L4dsAAAAd/d20-dnd.gif')
        .setDescription(`__Melhor Resultado:__ **${maxResult}**` + `+${sum} = ${resultado}` + `\n__Resultados__: ${resultsString} \n__Numero de Lados:__ ${sides} \n __Total somado:__ ${total} **(Bonus: +${sum})**`);

    await interaction.reply({ embeds: [embed] });
  },
};
