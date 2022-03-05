/**
 * @jest-environment jsdom
 */

import taskList from '../src/modules/taskList.js';
import {
  taskAdd, taskCompleted, taskEdit, removeCompleted,
} from '../src/modules/events.js';
import createMockDoc from './mocks/docMock.js';

describe('functionality test of add and remove', () => {
  test('should add new task to the DOM', () => {
    createMockDoc();
    taskList.addTask('please work');
    taskAdd(13, taskList);
    const list = document.querySelectorAll('.list li');
    expect(list).toHaveLength(1);
  });

  test('should remove task from list', () => {
    let arr = [];
    createMockDoc();
    arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    arr.forEach((item) => {
      taskList.addTask(item);
      taskAdd(13, taskList);
    });

    const removeButton = document.querySelector('.dots-container');
    const dotsIcon = removeButton.children[0];
    dotsIcon.classList.toggle('fa-ellipsis-vertical');
    dotsIcon.classList.toggle('fa-trash-can');

    const event = {
      type: 'click',
      target: dotsIcon,
    };

    taskEdit(event, taskList);

    const li = document.querySelectorAll('ul li');
    expect(li.length).toBe(5);
  });

  test('should clear all completed tasks', () => {
    let arr = [];
    createMockDoc();
    arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    arr.forEach((item) => {
      taskList.addTask(item);
      taskAdd(13, taskList);
    });

    const checkbox = document.querySelector('.checkbox');

    const event = {
      type: 'change',
      target: checkbox,
    };

    taskCompleted(event, taskList);

    removeCompleted(taskList);

    const li = document.querySelectorAll('ul li');
    expect(li.length).toBe(5);
  });

  test(' should check for editability', () => {
    let arr = [];
    createMockDoc();
    arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    arr.forEach((item) => {
      taskList.addTask(item);
      taskAdd(13, taskList);
    });

    const removeButton = document.querySelector('.dots-container');
    const dotsIcon = removeButton.children[0];

    const event = {
      type: 'click',
      target: dotsIcon,
    };

    taskEdit(event, taskList);

    const input = document.querySelector('.description');
    expect(input.disabled).toBe(false);
  });

  test('should check for completed status', () => {
    let arr = [];
    createMockDoc();
    arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    arr.forEach((item) => {
      taskList.addTask(item);
      taskAdd(13, taskList);
    });

    const checkbox = document.querySelector('.checkbox');
    const event = {
      type: 'click',
      target: checkbox,
    };
    taskCompleted(event, taskList);
    const check = document.querySelector('.description').classList.contains('completed');
    expect(check).toBe(true);
  });
});