export class Session {
  static setSession(data: any) {
    localStorage.setItem("session", data)
  }

  static getSession(data: any) {
    data = localStorage.getItem('session')
    return data;
  }

}
