import React from "react";
import { Avatar, Skeleton, Icon } from "antd";

import DefaultImage from "../../../../assets/image/base-image.jpg";
import { Link } from 'react-router-dom';
export default function HeadCard(props) {
  return (
    <Link
    >
      <div className="first-card test">
        <img
          className="img-card-background"
          src={
            props && props.item && props.item.imageUrl
              ? props.item.imageUrl
              : DefaultImage
          }
          alt="info "
        />
        <div className="first-card-content " />
        <div className="info-card">
          <h5>{props && props.item && props.item.title}</h5>
          <div className="info-writor">
            <div className="writor">
              <Skeleton
                avatar
                paragraph={{ rows: 2 }}
                active
                loading={props.loading}
              >
                <Avatar
                  src={
                    props && props.item && props.item.admin
                      ? props.item.admin.avatarUrl
                      : DefaultImage
                  }
                  style={{ marginRight: 10 }}
                  size={40}
                  icon={"user"}
                />
                <div>
                  <div>
                    {props && props.item && (
                      props.item.admin.lastName +
                      " " +
                      props.item.admin.firstName
                    )}
                  </div>
                  <div>
                    <Icon type={"eye"} />
                    {props && props.item && props.item.viewNumber}
                  </div>
                </div>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
