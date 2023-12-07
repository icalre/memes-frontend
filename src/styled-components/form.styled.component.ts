import styled from 'styled-components';
import {Form} from 'antd';

export const FormItem = styled(Form.Item).attrs(props => (
    {
        ...props,
        className: 'mb-2.5'
    }
))``;