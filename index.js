const {Telegraf, Markup} = require('telegraf')
const {message} = require('telegraf/filters')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)

const start_Menu = bot.command('start', async (ctx) => {
    try {
        await ctx.replyWithHTML(
            `<b>Привет ${ctx.from.first_name
                ? ctx.from.first_name
                : "пользователь"} что вам подсказать 👇</b>`,
            Markup.inlineKeyboard([
                [
                    Markup
                        .button
                        .callback('Контакты', 'contacts_panel'),
                    Markup
                        .button
                        .callback('Способы оплаты', 'payment_option')
                ],
                [
                    Markup
                        .button
                        .callback('Наш телеграмм', 'our_telegramm'),
                    Markup
                        .button
                        .callback('Информация', 'info_gas')
                ]
            ])
        )
    } catch (error) {
        console.log(error)
    }
})

bot.action('contacts_panel', async(ctx) => {
    try {
        await ctx.answerCbQuery()
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

📬 Официальный канал в Телеграмм - https://t.me/gudermesGES`, Markup.inlineKeyboard([[Markup.button.callback('⬅️ Меню', 'back_to_menu')]]))
    } catch (error) {
        console.log(error)
    }
})

bot.action('payment_option', async(ctx) =>{
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML(`
✅ В любом кассе АО "Чеченэнерго"

✅ В приложении вашего банка

✅ В официальном приложении для телефона👇`, Markup.inlineKeyboard([
            [Markup.button.url('Программа для apple', 'https://clicks.su/9alOLV')],
            [Markup.button.url('Программа для android', 'https://clicks.su/y5Bkvd')],
            [Markup.button.callback('⬅️ Меню', 'back_to_menu')]
        ]))
    } catch (error) {
        console.log(error)
    }
})

bot.action('back_to_menu', (async ctx =>{
    try {
         await ctx.answerCbQuery()
         await ctx.replyWithHTML(
            `<b>Привет ${ctx.from.first_name
                ? ctx.from.first_name
                : "пользователь"} что вам подсказать 👇</b>`,
            Markup.inlineKeyboard([
                [
                    Markup
                        .button
                        .callback('Контакты', 'contacts_panel'),
                    Markup
                        .button
                        .callback('Способы оплаты', 'payment_option')
                ],
                [
                    Markup
                        .button
                        .callback('Наш телеграмм', 'our_telegramm'),
                    Markup
                        .button
                        .callback('Информация', 'info_gas')
                ]
            ])
        )
    } catch (error) {
        console.log(error)
    }
}))


bot.action('our_telegramm', async(ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML(`Официальный канал в Телеграмм - https://t.me/gudermesGES`)
    } catch (error) {
        console.log(error)
    }
})

bot.action('info_gas', async(ctx) =>{
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML(`Основные сведения по:`, Markup.inlineKeyboard([
            [Markup.button.callback('Тариф', 'gas_rate')],
            [Markup.button.url('Как снять показания с умного счетчика?', 'https://dzen.ru/a/ZEYncicD6CfJx6B5')],
            [Markup.button.callback('Как зарегистрироваться в приложении?', 'registration')],
            [Markup.button.callback('⬅️ Меню', 'back_to_menu')]
        ]))
    } catch (error) {
        console.log(error)
    }
})

bot.action('gas_rate', async(ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML(`
Коммерция - уточняйте в ГЭС
~7,26 - НН  
~6,59 - СН-2  

Население  
3,36 - город  
2,35 - село`, Markup.inlineKeyboard([[Markup.button.callback('⬅️ Меню', 'back_to_menu')]]))
    } catch (error) {
        console.log(error)
    }
})
    

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))