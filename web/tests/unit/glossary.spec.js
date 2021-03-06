//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GlossaryPage from "@/views/GlossaryPage.vue";
import GlossaryFilter from "@/components/GlossaryFilter.vue"
import GlossaryList from "@/components/GlossaryList.vue"
import store from "@/store.js"

const localVue = createLocalVue();
localVue.use(Vuex);

process.env.TEST_JSON = `[
    {"type": "Acronym", "code": "PPA", "definition": "Power Purchase Agreement"},
    {"type": "Abbreviation", "code": "Qualif", "definition": "Qualifications"}
]`;

describe('GlossaryPage', () => {

  it('renders a correct markup clip', () => {
    const wrapper = shallowMount(GlossaryPage, { store, localVue });
    expect(wrapper.html()).toContain('Glossary Items');
  });

  it('sets the computed count correctly', () => {
    const wrapper = shallowMount(GlossaryPage, {store, localVue});
    wrapper.vm.$store.state.returnItemsCount = 10;
    expect(wrapper.vm.returnItemsCount).toBe(10);
  });

});

describe('GlossaryFilter', () => {

  it('renders a correct markup clip', () => {
    const wrapper = shallowMount(GlossaryFilter, {store, localVue});
    expect(wrapper.html()).toContain('Acronym');
  });

  it('clears all filters on clearFilters()', () => {
    const wrapper = shallowMount(GlossaryFilter, {store, localVue});
    wrapper.vm.clearFilters();
    console.log(wrapper.vm.$store.state.chkAcronym)
    console.log(wrapper.vm.$store.state.chkAbbreviation)
    console.log(wrapper.vm.searchTerm)
    let result = wrapper.vm.$store.state.chkAcronym || wrapper.vm.$store.state.chkAbbreviation ||
        wrapper.vm.$store.state.searchTerm != "";
    expect(result).toBe(false);
   });
});

describe('GlossaryList', () => {

  it('renders a correct markup clip', () => {
    const wrapper = shallowMount(GlossaryList, {store, localVue});
    expect(wrapper.html()).toContain('glossary-public-list-container');
  });

  it('loads the mock JSON correctly', () => {
    const wrapper = shallowMount(GlossaryList, {store, localVue});
    expect(wrapper.vm.$store.state.returnItemsCount).toBe(2);
    expect(wrapper.vm.$store.state.apiData[0]["type"]).toBe("Acronym");
    expect(wrapper.vm.$store.state.apiData[0]["code"]).toBe("PPA");
    expect(wrapper.vm.$store.state.apiData[1]["definition"]).toBe("Qualifications");
    expect(wrapper.vm.$store.state.apiLoading).toBe(false);
    expect(wrapper.vm.$store.state.dataReady).toBe(true);
  });

});