module.exports=function(err, req, res, next){
    //log the exception
    //sentry,insert here
    return res.status(500).send(err);
}