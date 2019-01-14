/**
 * Created by Administrator on 2016/12/30 0030.
 */
import Encryption from './encryption'
export default class WebStorage{
  static setItem(key,val){
    let message=Encryption.encryptByDES(JSON.stringify(val))

    localStorage.setItem(key,message);
  }
  static getItem(key){
    let str=localStorage.getItem(key);
    let message='';
    if(str){
      message=Encryption.decryptByDES(str);
      try {
        return JSON.parse(message);
      }catch(e){
        return str
      }
    }
    return '';
  }
  static removeItem(key){
    localStorage.removeItem(key)
  }
  static removeAll(){
    localStorage.clear();
  }
  static queryOfkey(key,name) {
    var obj = localStorage.getItem(key);
    if(obj){
      return obj[name];
    }
    return ''
  }
}
