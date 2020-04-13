import React from 'react';
import _ from 'lodash';
import { ReactComponent as CloseIcon } from 'assets/close.svg';
import './SelectedSubjects.scss';

interface Props {
  data: TransformedData[] | [];
  removeHandler: (subject: TransformedData) => void;
}

const SelectedSubjects = (props: Props) => {
  const { data, removeHandler } = props;
  return (
    <div className="selected-subjects">
      {_.map(data, subject => (
        <div className="selected-subject" key={subject.name}>
          {subject.name}
          <span
            className="selected-subject__close"
            onClick={() => removeHandler(subject)}
          >
            <CloseIcon />
          </span>
        </div>
      ))}
    </div>
  );
};

export default SelectedSubjects;
