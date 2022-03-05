/**
 * @jest-environment jsdom
 */

import taskList from '../src/modules/taskList.js';
import { taskAdd, taskEdit } from '../src/modules/events.js';
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
});
