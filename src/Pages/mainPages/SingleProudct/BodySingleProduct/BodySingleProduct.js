import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../Contexts/AuthContext';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function BodySingleProduct(props) {
  const [value, setValue] = React.useState(0);
  const { singlepro } = props;
  
  const { isLoggedIn, user } = useAuth(); // استفاده از useAuth برای وضعیت لاگین و اطلاعات کاربر

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="توضیحات" {...a11yProps(0)} />
          <Tab label="سوالات متداول" {...a11yProps(1)} />
          <Tab label="نظرات" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {singlepro.body}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>چگونه سفارش محصول را ثبت کنم؟</Accordion.Header>
            <Accordion.Body>
              برای ثبت سفارش، ابتدا محصول مورد نظر را به سبد خرید خود اضافه کنید. سپس به صفحه سبد خرید بروید و مشخصات آدرس و اطلاعات تحویل را وارد کنید. در نهایت، با انتخاب روش پرداخت، سفارش خود را نهایی کنید.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>چه روش‌های پرداختی مورد قبول است؟</Accordion.Header>
            <Accordion.Body>
              روش‌های پرداختی مورد قبول ممکن است بسته به فروشنده و وب‌سایت خرید متفاوت باشند، اما معمولاً روش‌هایی مانند پرداخت از طریق کارت اعتباری، پرداخت اینترنتی، پرداخت از طریق درگاه‌های اینترنتی معتبر، وجه نقد و ... انتخاب می‌شوند.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>آیا اطلاعات کارت اعتباری من امن است؟</Accordion.Header>
            <Accordion.Body>
              بله، بسیاری از وب‌سایت‌های خرید امنیت اطلاعات کارت اعتباری را جدی می‌گیرند و از روش‌های رمزنگاری و پروتکل‌های امنیتی استفاده می‌کنند تا اطلاعات شما را محافظت کنند. همچنین، در انتخاب درگاه‌های پرداخت معتبر و اطمینان از صحت امضاء دیجیتال سایت‌ها نیز اهمیت دارد.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>زمان تحویل سفارش چقدر است؟</Accordion.Header>
            <Accordion.Body>
              زمان تحویل سفارش ممکن است بسته به محصول و مقصد تحویل، متفاوت باشد. در برخی موارد، فروشنده میزان زمان تحویل را به صورت دقیق اعلام می‌کند و در دیگر موارد، باید از خود فروشنده استعلام کنید.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>چگونه از برگشت کالا یا استرداد وجه استفاده کنم؟</Accordion.Header>
            <Accordion.Body>
              اگر محصول خریداری شده با مشکلی مواجه شد یا نیاز به برگشت دارید، باید با فروشنده یا پشتیبانی وب‌سایت تماس بگیرید. اغلب وب‌سایت‌های خرید قوانین برگشت و استرداد را دارند که شما می‌توانید به آن‌ها مراجعه کنید و به شرایط و ضوابط آن‌ها پایبند شوید.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {isLoggedIn ? (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>آدرس ایمیل</Form.Label>
              <Form.Control required type="email" placeholder="" value={user.email} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>نظر شما</Form.Label>
              <Form.Control required as="textarea" rows={3} />
            </Form.Group>
            <Button
              variant="primary"
              onClick={(event) => {
                event.preventDefault();
                alert('نظر شما ارسال شد');
              }}
              type="submit"
            >
              ارسال
            </Button>
          </Form>
        ) : (
          <>
            <p>لطفا برای ارسال نظر ابتدا وارد حساب کاربری شوید:</p>
            <Link className="btn btn-primary" to="../useraccount/login">
              ورود
            </Link>
          </>
        )}
      </CustomTabPanel>
    </Box>
  );
}
