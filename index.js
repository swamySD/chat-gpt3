// 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
const { Configuration, OpenAIApi } = require("openai");
const express=require('express')
const cors=require('cors')
const json=require('body-parser')

const configuration = new Configuration({
    organization: "org-3UJENqaG6eREJVcg9AJsSz4w",
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);

const app=express()


app.use(json())
app.use(cors())

const port=3080

app.post('/', async(req,res)=>{
    const {message,currentModel}=req.body;
    console.log(message,"message")
    console.log(currentModel)
    console.log(currentModel)
    const response = await openai.createCompletion({
         model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      console.log(response.data.choices[0].text)
    res.json({
        // data:response.data,
        // data:message,
        message:response.data.choices[0].text
    })
    // console.log(data)
})


app.get('/models',async(req,res)=>{
    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
        models:response.data.data
    })
    console.log(response.data.data)
})


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})




