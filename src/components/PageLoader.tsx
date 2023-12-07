import { Spin } from 'antd';
import {ContainerLoader} from "../styled-components";

export const PageLoader = () => {
  return (<ContainerLoader>
    <Spin size="large" />
  </ContainerLoader>);
}