export default interface IUser{
    email : string,
    name : string,
    age : number,
    password?: string,
    phoneNumber : string
}

// or use class for modeling

// export default class IUser{
//     email : string = '' ;
//     name : string = '';
//     age : number | null = null;
//     password : string = '';
//     phoneNumber : string = '';
// }