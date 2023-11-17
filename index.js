const {Telegraf, Markup} = require('telegraf')
const {message} = require('telegraf/filters')
require('dotenv').config()
const text = require('./const')
const keyboards = require('./keyboards')
const { Keyboard, Key } = require('telegram-keyboard')




const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', async (ctx) => {
    try {
         await ctx.replyWithHTML(
            `<b>Привет ${ctx.from.first_name
                ? ctx.from.first_name
                : "пользователь"} что вам подсказать 👇</b>`,
            keyboards.keyboard)
    } catch (error) {
        console.log(error)
    }
})

bot.hears('Контакты', async(ctx) => {
        await ctx.replyWithHTML(`
        ⚡️Гудермесские ГЭС⚡️

📍 Адрес: г.Гудермес, Школьная, 22

Режим работы
ГЭС: Пн Вт Ср Чт Пт
Касса: Пн Вт Ср Чт Пт Сб
-----
🕖 8:00-17:00
🕛 12:00-13:00 Обед

📨 E-mail: gudermes-gres@chechenergo.ru

☎️ Телефон диспетчера:

📬 Официальный канал в Телеграмм - https://t.me/gudermesGES`, Keyboard.make([
    ['⬅️ Меню']
]).reply())
})

bot.hears('Способы оплаты', async(ctx) =>{

    await ctx.reply(`
✅ В любом кассе АО "Чеченэнерго"

✅ В приложении вашего банка

✅ В официальном приложении для телефона👇`, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Программа для apple', url: 'https://clicks.su/9alOLV' },
                    { text: 'Программа для android', url: 'https://clicks.su/y5Bkvd' },
                ],
                [
                    { text: '⬅️ Меню', callback_data: 'back_to_menu' }
                ]
            ]
        }
    });
});

bot.action('back_to_menu', (async ctx =>{
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML(
           `<b>Привет ${ctx.from.first_name
               ? ctx.from.first_name
               : "пользователь"} что вам подсказать 👇</b>`,
           keyboards.keyboard)
   } catch (error) {
       console.log(error)
   }
}))


bot.hears('⬅️ Меню', async (ctx) => {
    try {
         await ctx.replyWithHTML(
            `<b>Привет ${ctx.from.first_name
                ? ctx.from.first_name
                : "пользователь"} что вам подсказать 👇</b>`,
            keyboards.keyboard)
    } catch (error) {
        console.log(error)
    }
})



bot.hears('Наш телеграмм', async(ctx) => {
        await ctx.replyWithHTML(`Официальный канал в Телеграмм - https://t.me/gudermesGES`, 
        Keyboard.make([['⬅️ Меню']]).reply())
})

bot.hears('Информация', async(ctx) =>{

        await ctx.replyWithHTML(`Основные сведения по:`, Keyboard.make([
            ['Тариф'],
            ['Как снять показания с умного счетчика?'],
            ['Как зарегистрироваться в приложении?'],
            ['⬅️ Меню']
        ]).reply())
    
})

bot.hears('Тариф', async(ctx) => {
    
        await ctx.replyWithHTML(`
Коммерция - уточняйте в ГЭС
~7,26 - НН  
~6,59 - СН-2  

Население  
3,36 - город  
2,35 - село`, Keyboard.make([['⬅️ Меню']]).reply())
})
    

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))