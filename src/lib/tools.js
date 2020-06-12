export const getImgUrl = (imgPath, width = 185)=> {
    return `//image.tmdb.org/t/p/w${width}${imgPath}`
};

export const formatDuration = (d)=> {
    let h = Math.floor(d / 3600);
    let _h = d % 3600
    let m = Math.floor(_h / 60);
    let s = Math.floor(_h % 60);
    return adjust(h,true)+adjust(m)+adjust(s,false,true)
};

export const adjust = (d, removeIfEmpty = false, noSep = false)=> {
    let _ex = (d<10)?"0":""
    let sep = (!noSep)?":":""
    let r = (removeIfEmpty === true && d === 0)?"":_ex+d+sep
    return r
};

export const getProgressBarPosition = (d, w)=> {
    let sF = Math.floor(d.duration)
    let sO = Math.floor(d.currentTime)
    if(sO == 0)
      return 0
    let _r =  sF / sO
    return w / _r
};
