export const matchsKeySearch = (title: string, keySearch: string): boolean => {
    if (title.toLocaleLowerCase().trim().includes(keySearch.toLocaleLowerCase().trim())) {
        return true
    } else {
        return false
    }
}

export const formatDate = (date: string) => {
    if (date == '') {
      return 'unkown date!'
    }

    let formatedDate = ''
    for (let chr of date) {

      if (chr == '.') {
        break
      } else if (chr == 'T') {
        formatedDate += ' '
      } else {
        formatedDate += chr
      }
    }

    return formatedDate
  }