import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react';
import formController from './controller';
import store from '../../models/jobsForm/form-store';
import '../../../css/form.css';


const JobsForm = observer(() => (
  <div>
    <Modal
      className="modal-window"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={store.open}
      onClose={formController.closeModal}
    >
      <div>
        <Typography variant="h6" id="modal-title">
          Text in a modal
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Button onClick={formController.closeModal}>Close</Button>
      </div>
    </Modal>
  </div>
));

export default JobsForm;
