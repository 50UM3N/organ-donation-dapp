export const handleRPCError = (err: any) => {
    let errRPC = err.toString();
    if (errRPC.indexOf("Internal JSON-RPC error.") > -1) {
        errRPC = errRPC.replace("\n", "").replace("Error: ", "").replace("Internal JSON-RPC error.", "");
        errRPC = JSON.parse(errRPC);
        return errRPC;
    } else {
        return err;
    }
};
