import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Projects from './projects';
import Resources from './resources';
import UserStories from '/.user_stories';
import { fetchProjects, fetchResources, fetchUserStories } from '../actions/index';