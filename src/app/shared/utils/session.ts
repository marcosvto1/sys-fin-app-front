export class Session {
  static setSession(data: any) {
    localStorage.setItem("session", JSON.stringify(data))
  }

  static getSession() {
    const data = localStorage.getItem('session')
    if (data) {
      return JSON.parse(data)
    }
    return data;
  }

  static clear() {
    localStorage.removeItem('session')
  }

}
