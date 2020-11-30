import React from 'react';
import getStyle from './style';
import ContentArea from '../../../ContentArea';
import DeleteSegmentModal from './DeleteSegmentModal';
import EntryModal from './EntryModal';

function GeneralEntry({
  style: styleProp
}) {

  const style = getStyle(styleProp);
  
  return (
    <>
      <ContentArea title="Enter Time" style={style.contentArea}>
        
      </ContentArea>
      <EntryModal
      
      />
      <EntryModal
        
      />
      <DeleteSegmentModal
      
      />
    </>
  );
}

export default GeneralEntry;