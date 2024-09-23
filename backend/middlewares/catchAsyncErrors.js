export const catchAsyncError = (msgFunction) => {
    return(req, res, next) => 
        {
        Promise.resolve(msgFunction(req,res,next)).catch(next);

};
}; 