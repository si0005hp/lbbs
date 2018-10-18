import * as moment from 'moment'


class MomentUtils {
  static fmtDate(date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
  }
}

export default MomentUtils