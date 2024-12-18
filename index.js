import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import {Configuration, OpenAIApi} from 'openai'

const app = express()

env.config()

app.use(cors())
app.use(bodyParser.json())


// Configure open api
const configuration = new Configuration({
    organization: "org-TmMsYRB81n9adN8RZjWjK87z",
    apiKey: process.env.API_KEY 
})
console.log(configuration)
const openai = new OpenAIApi(configuration)


// listeninng
app.listen("3000", ()=>console.log("listening on port 3080"))


// dummy route to test
app.get("/", (req, res) => {
    res.send("Hello World!")
})


//post route for making requests
app.post('/', async (req, res)=>{
    const {message} = req.body

    try{
        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: `${message}`,
        //     max_tokens: 100,
        //     temperature: .5
        // })
        // console.log(responnse)
        // res.json({message: response.data.choices[0].text})
          const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", // or 'gpt-4' if enabled for your API key
            messages: [{ role: "user", content: prompt }],
        });

        res.send({ reply: response.data.choices[0].message.content });

    }catch(e){
        console.log(e)
        res.send(e).status(400)
    }
})
