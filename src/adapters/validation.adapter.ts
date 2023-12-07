export const validationAdapter = (data: any) => {
    const errors: any = {};

    data.map((item:any)=>{
        if(!errors[item.path[0]])
        {
            errors[item.path[0]] = [];
        }

        errors[item.path[0]].push(item.message);
    });


    return errors;

};