const express = require("express");
const ZingMp3 = require("zingmp3-api");
const getSong = require("./modules/getSong");
const createError = require("http-errors");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan"); 

const app = express();

app.use(cors());
app.use(helmet());
// app.use(morgan("combined"));
app.use(express.json());


const port = process.env.PORT || 8000;

app.listen(port,  "0.0.0.0", () => {
    console.log(`http://localhost:${port}`, "oke");
});

app.get("/", (req, res) => {
    res.send("Hello guys !")
})

app.get("/search/:search", async (req, res) => {
    try {
        const { search } = req.params;

        if(!search) {
            return res.send({
                status: "error",
                msg: "Bad request."
            })
        }

        const data = await ZingMp3.search(search);
        

        return res.send({
            status: "success",
            data
        })
    } catch (error) {
        return res.send({
            status: "error",
            msg: error.message
        })
    }
});

app.get("/top-100", async (req, res) => {
    try {
        const data = await ZingMp3.getTop100();
        return res.send({
            status: "success",
            data
        })
    } catch (error) {
        return res.send({
            status: "error",
            msg: error.message
        })
    }
})

app.get("/list-song/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        if(!id) {
            return res.send({
                status: "error",
                msg: "Bad request."
            })
        } 
        const data = await ZingMp3.getDetailPlaylist(id); 

        return res.send({
            status: "success",
            data: data
        })       
        
    } catch (error) {
        return res.send({
            status: "error",
            msg: error.message
        })
    }
    
}) 

app.get("/song_v1/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        if(!id) {
            return res.send({
                status: "error",
                msg: "Bad request."
            })
        }

        const data = await ZingMp3.getStreaming(id); 
        if(data) {
            console.log({
                data
            });
            return res.send({
                status: "success",
                data
            })
        }    
        
    } catch (error) {
        console.log({ error });
        return res.send({
            status: "error",
            msg: error
        })
    }
})


app.get("/song/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        if(!id) {
            return res.send({
                status: "error",
                msg: "Bad request."
            })
        }

        const data = await getSong(id); 
        if(data) {
            return res.send({
                status: "success",
                data
            })
        }    
        
    } catch (error) {
        return res.send({
            status: "error",
            msg: error.message
        })
    }
    
}) 

app.use((req, res, next) => {
    next(createError.NotFound("Not found"));
});

app.use((error, req, res, next) => {
    res.json({
        status: "error",
        msg: error.message,
        code: error.status || 500
    })
});