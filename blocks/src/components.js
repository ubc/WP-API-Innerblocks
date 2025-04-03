import { useBlockProps } from '@wordpress/block-editor';
import { getSettings as getDateSettings } from '@wordpress/date';

const BlockNotSupportMessage = ( props ) => {
   return  <div { ...useBlockProps() } style={{
       padding: '20px',
       background: '#c6c6c6',
       margin: '0.83em 0'
   }}>{ props.children }</div>
}

const getDateFromGmt = ( gmtTimeString, format ) => {
    const { timezone } = getDateSettings();

    // Parse the GMT time string using Moment.js
    var momentGmt = moment.utc( gmtTimeString );

    // Convert the GMT time to the desired timezone based on offset
    var momentLocal = momentGmt.utcOffset( parseInt( timezone.offset ) );

    // Format the local time as per the format string
    var formattedTime = momentLocal.format( toMomentFormat( format ) );

    return formattedTime;
}

const toMomentFormat = ( format ) => {
    var conversions = {
      'd': 'DD',
      'D': 'ddd',
      'j': 'D',
      'l': 'dddd',
      'N': 'E',
      'S': 'o',
      'w': 'e',
      'z': 'DDD',
      'W': 'W',
      'F': 'MMMM',
      'm': 'MM',
      'M': 'MMM',
      'n': 'M',
      't': '',
      'L': '',
      'o': 'YYYY',
      'Y': 'YYYY',
      'y': 'YY',
      'a': 'a',
      'A': 'A',
      'B': '',
      'g': 'h',
      'G': 'H',
      'h': 'hh',
      'H': 'HH',
      'i': 'mm',
      's': 'ss',
      'u': 'SSS',
      'e': 'zz',
      'I': '',
      'O': '',
      'P': '',
      'T': '',
      'Z': '',
      'c': '',
      'r': '',
      'U': 'X',
    };
    
    return format.replace(/[A-Za-z]+/g, function(match) {
      return conversions[match] || match;
    });
}

export {
    BlockNotSupportMessage,
    getDateFromGmt
}