import { storageGet } from '../src/popup/redux/thunk/getbyid'
import { Bookmark } from '../src/popup/type/type'

chrome.runtime.onInstalled.addListener(() => {})

chrome.webNavigation.onBeforeNavigate.addListener(async (data) => {
    const queryData = queryParser(decodeURI(data.url))
      
    const [shortcut, searchingWord] = queryData.q.split(/\+(.*)/)
      
    const currentTab: chrome.tabs.Tab = await getCurrentTab() 
    const shortcutData: Bookmark = await storageGet<Bookmark>(shortcut)

    chrome.tabs.update(currentTab.id, {
      url: redirectUrl({
        shortcut,
        searchingWord
      }, shortcutData[shortcut]) 
    })
})

type GoogleSearch = {
  q: string
}

/**
 * 
 * @param url 
 * @returns 
 */
function queryParser(url: string): GoogleSearch {
    let urlQuery: string = url.split("?")[1]
    let urlQueryStrings: Array<string> = urlQuery.split("&")  
    let searchDataWithString: string = urlQueryStrings.filter( query => query.startsWith('q='))[0]
    let searchData = searchDataWithString.split("=")
    
    const result = {}

    result[searchData[0]] = searchData[1]

    return result as GoogleSearch
}

async function getCurrentTab(): Promise<chrome.tabs.Tab> {
  let queryOptions: chrome.tabs.QueryInfo = {
    active: true,
    lastFocusedWindow: true
  }

  let [tab] = await chrome.tabs.query(queryOptions)

  return tab
}

type Search = {
  shortcut: string,
  searchingWord: string
}

function redirectUrl(searchData: Search, shortcutData: Bookmark): string {

  const url = shortcutData.url

  console.log(url)

  return url.indexOf('@@@') === -1 ? url : url.replace('@@@', searchData.searchingWord ? searchData.searchingWord : '')

}