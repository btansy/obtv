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
import UnitsPage from "@/views/UnitsPage.vue";
import UnitFilter from "@/components/UnitFilter.vue"
import UnitList from "@/components/UnitList.vue"
import store from "@/store.js"

const localVue = createLocalVue();
localVue.use(Vuex);

process.env.TEST_JSON = `[
    {"id": "acre", "name": "Acre", "symbol": "a", "type": "area", "standard": "Customary", "definition": "Acre"},
    {"id": "J", "name": "Joule", "symbol": "J", "type": "energy", "standard": "SI", "definition": "Joule"}
]`;

describe('UnitsPage', () => {

  it('renders a correct markup clip', () => {
    const wrapper = shallowMount(UnitsPage, { store, localVue });
    expect(wrapper.html()).toContain('Units');
  });

  it('sets the computed count correctly', () => {
    const wrapper = shallowMount(UnitsPage, {store, localVue});
    wrapper.vm.$store.state.returnItemsCount = 10;
    expect(wrapper.vm.returnItemsCount).toBe(10)
  });
});

describe('UnitFilter', () => {

  it('renders a correct markup clip', () => {
    const wrapper = shallowMount(UnitFilter, {store, localVue});
    expect(wrapper.html()).toContain('ISO 4217');
  });

  it('clears all filters on clearFilters()', () => {
    const wrapper = shallowMount(UnitFilter, {store, localVue});
    wrapper.vm.clearFilters();
    let result = wrapper.vm.$store.state.chkCustomary || wrapper.vm.$store.state.chkISO4217 ||
        wrapper.vm.$store.state.chkSI || wrapper.vm.$store.state.chkNonSI ||
        wrapper.vm.$store.state.searchTerm != "";
    expect(result).toBe(false);
  });
});

describe('UnitList', () => {

  it('renders a correct markup clip', () => {
    const wrapper = shallowMount(UnitList, {store, localVue});
    expect(wrapper.html()).toContain('unit-public-list-container');
  });

  it('loads the mock JSON correctly', () => {
    const wrapper = shallowMount(UnitList, {store, localVue});
    expect(wrapper.vm.$store.state.returnItemsCount).toBe(2);
    expect(wrapper.vm.$store.state.apiData[0]["id"]).toBe("acre");
    expect(wrapper.vm.$store.state.apiData[0]["name"]).toBe("Acre");
    expect(wrapper.vm.$store.state.apiData[0]["symbol"]).toBe("a");
    expect(wrapper.vm.$store.state.apiData[1]["type"]).toBe("energy");
    expect(wrapper.vm.$store.state.apiData[1]["standard"]).toBe("SI");
    expect(wrapper.vm.$store.state.apiData[1]["definition"]).toBe("Joule");
    expect(wrapper.vm.$store.state.apiLoading).toBe(false);
    expect(wrapper.vm.$store.state.dataReady).toBe(true);
  });
});
