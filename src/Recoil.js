import {atom} from 'recoil'

 export const SearchAll=atom({
    key:"SearchAll",
    default:[]
})

export const isLogIn=atom({
  key:"IsLogin",
  default:false
})
  export const chooosedHotel = atom({
    key : "chooosedHotel",
    default : {}
  })
  export const desitnationID = atom({
    key : "desitnationID",
    default : {}
  })