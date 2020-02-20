import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {renderToStaticMarkup} from 'react-dom/server'
import {Grid, Button} from '@material-ui/core';
import {compose} from 'redux';
import Card from 'components/Card/Loadable'
import messages from './messages';
import SweetAlertSingle from './alert'
import 'sass/elements/sweet-alerts.scss'

const SweetAlertComponent = () => {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [warning, setWarning] = useState(false)
  const [error, setError] = useState(false)
  const [info, setInfo] = useState(false)
  return (
    <Fragment>
      <Helmet>
        <title>SweetAlert</title>
        <meta name="description" content="Description of SweetAlert"/>
      </Helmet>
      <h2 className="breadcumbTitle">Alerts</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            title="Sweet Alert"
          >
            <ul className="alertBtn">
              <li>
                <Button
                  className="btn bg-default"
                  onClick={() => setShow(true)}>Default
                </Button>
              </li>
              <li>
                <Button
                  className="btn bg-success"
                  onClick={() => setSuccess(true)}>Success
                </Button>
              </li>
              <li>
                <Button
                  className="btn bg-warning"
                  onClick={() => setWarning(true)}>warning
                </Button>
              </li>
              <li>
                <Button
                  className="btn bg-danger"
                  onClick={() => setError(true)}>Error
                </Button>
              </li>
              <li>
                <Button
                  className="btn bg-info"
                  onClick={() => setInfo(true)}>Info
                </Button>
              </li>
            </ul>

            <SweetAlertSingle
              title="Default"
              show={show}
              confirmButtonText="confirm"
              cancelButtonText='Cancel'
              showCancelButton={true}
              onConfirm={() => setShow(false)}
              onCancel={() => setShow(false)}
              text={renderToStaticMarkup(<span>lit Amet dolorem nostrum tenetur aut inventore odit.it Amet dolorem nostrum tenetur aut inventore odit.</span>)}
              showLoaderOnConfirm={true}
            />

            <SweetAlertSingle
              title="Success"
              type="success"
              show={success}
              success
              confirmButtonText="confirm"
              cancelButtonText='Cancel'
              showCancelButton={true}
              onConfirm={() => setSuccess(false)}
              onCancel={() => setSuccess(false)}
              text={renderToStaticMarkup(<span>lit Amet dolorem nostrum tenetur aut inventore odit.it Amet dolorem nostrum tenetur aut inventore odit.</span>)}
              showLoaderOnConfirm={true}
            />

            <SweetAlertSingle
              title="Warning"
              show={warning}
              type="warning"
              warning
              confirmButtonText="confirm"
              cancelButtonText='Cancel'
              showCancelButton={true}
              onConfirm={() => setWarning(false)}
              onCancel={() => setWarning(false)}
              text={renderToStaticMarkup(<span>lit Amet dolorem nostrum tenetur aut inventore odit.it Amet dolorem nostrum tenetur aut inventore odit.</span>)}
              showLoaderOnConfirm={true}
            />

            <SweetAlertSingle
              title="Error"
              show={error}
              type="error"
              error
              confirmButtonText="confirm"
              cancelButtonText='Cancel'
              showCancelButton={true}
              onConfirm={() => setError(false)}
              onCancel={() => setError(false)}
              text={renderToStaticMarkup(<span>lit Amet dolorem nostrum tenetur aut inventore odit.it Amet dolorem nostrum tenetur aut inventore odit.</span>)}
              showLoaderOnConfirm={true}
            />

            <SweetAlertSingle
              title="Info"
              show={info}
              type="info"
              info
              confirmButtonText="confirm"
              cancelButtonText='Cancel'
              showCancelButton={true}
              onConfirm={() => setInfo(false)}
              onCancel={() => setInfo(false)}
              text={renderToStaticMarkup(<span>lit Amet dolorem nostrum tenetur aut inventore odit.it Amet dolorem nostrum tenetur aut inventore odit.</span>)}
              showLoaderOnConfirm={true}
            />
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SweetAlertComponent);
