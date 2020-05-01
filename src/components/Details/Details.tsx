import React, { useRef, useEffect } from 'react';
import Modal from 'components/UI/Modal';
import ChartBuilder from 'native/ChartBuilder';

interface Props {
  data: TransformedData | null;
  onClose: () => void;
}

const Details = (props: Props) => {
  const { onClose, data } = props;
  const containerNode = useRef(null);

  useEffect(() => {
    const node = containerNode.current;
    if (node && data) {
      const chart = new ChartBuilder({
        containerNode: node,
        subjectName: data.name,
      });
      chart.update([data]);
    }
  }, [data]);

  return (
    <Modal onClose={onClose} show>
      <canvas
        className="chart"
        ref={containerNode}
      />
    </Modal>
  );
};

export default Details;
