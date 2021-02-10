//ACTIVATE ACCOUNT APP
var app = new Vue({
    el: '#app',
    data: {
        filters: {
            sample_id: 'all',
            role: 'all',
            rate: 'all',
            method: 'all',
            condition_set: 'all',
        },
        treatments: [
            { id: 1, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 2, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 3, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 4, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 5, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 6, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 7, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 8, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 9, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 10, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 11, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 12, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 13, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 14, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 15, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 16, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 17, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 18, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 19, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 20, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 21, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 22, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 23, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 24, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
        ],
        plates: [
            { id: 1, size: 384, name: 'Plate Name Goes Here', wells: [], filter_match: false, },
        ],
        current_plate_index: 0,
        selected_treatments: [],
        selected_wells: [],
        role_colors: {
            test_sample: '#0c0',
            ctrl_w_sample: '#ffcc32',
            ctrl_wo_sample: '#ff3302',
            blank: '#999',
        },
        role_names: {
            test_sample: 'TSTSAM',
            ctrl_w_sample: 'CTRLSAM',
            ctrl_wo_sample: 'CTRLNOSAM',
        },
        plate_sizes: {
            384: {
                columns: 24,
                rows: 16,
            }
        },
        well_row_letters: {
            0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P',
        },
        treatment_result_count: 0,
        well_result_count: 0,
        add_content: {
            condition_set: '',
            sample_id: '',
            rate: '',
        },
        c_s_active: false,
        s_active: false,
        r_active: false,
    },
    created: function () {
        var option3 = jQuery('.option-3-container').length;
        for (var i = 0; i < this.plates[this.current_plate_index].size; i++) {
            var content = null;
            if (option3) {
                content = {sample_id: '', role: '', condition_set: '', method: '', replicate: '', rate: '',};
            }
            this.plates[this.current_plate_index].wells.push({
                id: i+1,
                content: content,
                filter_match: false,
            });
        }
    },
    methods: {
        getObjectByKey: function (array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return array[i];
                }
            }
            return null;
        },
        getObjectIndexByKey: function (array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return i;
                }
            }
            return null;
        },
        count_placed_treatments: function () {
            var count = 0;
            for (var i = 0; i < this.treatments.length; i++) {
                if (this.treatments[i].place) {
                    count++;
                }
            }
            return count;
        },
        count_placed_wells: function (plate) {
            var count = 0;
            for (var i = 0; i < plate.wells.length; i++) {
                if (plate.wells[i].content) {
                    count++;
                }
            }
            return count;
        },
        get_column_count: function () {
            if (this.selected_wells.length) {
                var col_count = 1;
                for (var i = 0; i < this.selected_wells.length; i++) {
                    if (i !== this.selected_wells.length - 1) {
                        if (parseInt(this.selected_wells[i+1]) > parseInt(this.selected_wells[i]) + 1) {
                            break;
                        }
                        else {
                            col_count++;
                        }
                    }
                }
                return col_count;
            }
            else {
                return 0;
            }
        },
        get_well_location: function (id) {
            var columns = this.plate_sizes[this.plates[this.current_plate_index].size].columns;
            var letter = this.well_row_letters[Math.floor((parseInt(id)-1)/columns)];
            var number = parseInt(id) - (columns * Math.floor( parseInt(id)/columns ));
            if (!number) {
                number = parseInt(id) / Math.floor( parseInt(id)/columns );
            }
            return letter + ' ' + number;
        },
        place_series: function (array) {
            for (var i = 0; i < this.selected_treatments.length; i++) {
                var already_placed = this.getObjectByKey(app.plates[this.current_plate_index].wells, 'content', this.selected_treatments[i]);
                if (already_placed) {
                    already_placed.content = null;
                }
                this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', array[i]).content = this.selected_treatments[i];
                this.getObjectByKey(this.treatments, 'id', this.selected_treatments[i]).place = { plate_id: this.plates[this.current_plate_index].id, well_id: array[i] };
            }
            this.selected_treatments = [];
            this.selected_wells = [];
        },
        place_across: function () {
            this.place_series(this.selected_wells);
        },
        place_down: function () {
            var column_count = this.get_column_count();
            var row_count = this.selected_wells.length / columns;
            var columns = [];
            for (var i = 0; i < column_count; i++) {
                columns.push([]);
            }
            var column_index = 0;
            for (var i = 0; i < this.selected_wells.length; i++) {
                columns[column_index].push(this.selected_wells[i]);
                if (column_index === column_count - 1) {
                    column_index = 0;
                }
                else {
                    column_index++;
                }
            }
            var down_array = [].concat.apply([], columns);

            this.place_series(down_array);
        },
        set_as_blank: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', this.selected_wells[i]);
                var treatment = this.getObjectByKey(this.treatments, 'id', well.content);
                if (treatment) {
                    treatment.place = null;
                }
                well.content = 'blank';
            }
            this.selected_wells = [];
        },
        unplace_treatments: function () {
            for (var i = 0; i < this.selected_treatments.length; i++) {
                var treatment = this.getObjectByKey(this.treatments, 'id', this.selected_treatments[i]);
                if (treatment.place) {
                    var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', treatment.place.well_id);
                    if (well) {
                        well.content = null;
                    }
                    treatment.place = null;
                }
            }
            this.selected_treatments = [];
        },
        unplace_wells: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', this.selected_wells[i]);
                if (well.content) {
                    var treatment = this.getObjectByKey(this.treatments, 'id', well.content);
                    if (treatment) {
                        treatment.place = null;
                    }
                    well.content = null;
                }
            }
            this.selected_wells = [];
        },
        clear_plate: function () {
            var option3 = jQuery('.option-3-container').length;
            for (var i = 0; i < this.plates[this.current_plate_index].wells.length; i++) {
                if (this.plates[this.current_plate_index].wells[i].content) {
                    var treatment = this.getObjectByKey(this.treatments, 'id', this.plates[this.current_plate_index].wells[i].content);
                    if (treatment) {
                        treatment.place = null;
                    }
                    this.plates[this.current_plate_index].wells[i].content = null;
                    if (option3) {
                        this.plates[this.current_plate_index].wells[i].content = {sample_id: '', role: '', condition_set: '', method: '', replicate: '', rate: '',};
                    }
                }
            }
        },
        clear_filters: function () {
            var filters = this.filters;
            for (var key of Object.keys(filters)) {
                this.$set(this.filters, key, 'all');
            }
        },
        fill_wells: function () {
            var self = this;
            for (var i = 0; i < self.selected_wells.length; i++) {
                var well = self.getObjectByKey(self.plates[self.current_plate_index].wells, 'id', self.selected_wells[i]);
                if (well.content) {
                    if (well.content === 'blank') {
                        well.content = {sample_id: '', role: '', condition_set: '', method: '', replicate: '', rate: '',};
                    }
                    if (self.add_content.condition_set) {
                        well.content.condition_set = self.add_content.condition_set;
                        well.content.method = 'Method.1';
                    }
                    if (self.add_content.sample_id) {
                        well.content.sample_id = self.add_content.sample_id;
                        well.content.role = 'test_sample';
                    }
                    if (self.add_content.rate) {
                        well.content.rate = self.add_content.rate;
                    }
                    if (self.add_content.condition_set && self.add_content.sample_id && self.add_content.rate) {
                        well.content.replicate = (i+1) + ' out of ' + self.selected_wells.length;
                    }
                }
            }
            self.selected_wells = [];
            self.add_content = {
                condition_set: '',
                sample_id: '',
                rate: '',
            };
            self.c_s_active = false;
            self.s_active = false;
            self.r_active = false;
            Figure.modal('#add-content').hide();
        },
    },
    computed: {
        treatments_filtered_list: function () {
            var self = this;
            var resultsArray = self.treatments;
            var wellsArray = self.plates[self.current_plate_index].wells;
            if (wellsArray.length) {
                for (var i = 0; i < wellsArray.length; i++) {
                    wellsArray[i].filter_match = false;
                }
            }
            var wells_results_array = wellsArray;
            var well_filter_active = false;
            self.plates[this.current_plate_index].filter_match = false;
            self.treatment_result_count = 0;
            self.well_result_count = 0;
            var filters = this.filters;
            for (var key of Object.keys(filters)) {
                if (filters[key] !== 'all') {
                    var filter_array = resultsArray.filter(function (el) {
                        return el[key] == filters[key];
                    });
                    if (filter_array.length) {
                        resultsArray = filter_array;
                        self.treatment_result_count = filter_array.length;
                    }
                    wells_results_array = wells_results_array.filter(function (el) {
                        if (el.content) {
                            var treatment = self.getObjectByKey(self.treatments, 'id', el.content);
                            if (treatment) {
                                return treatment[key] == filters[key];
                            }
                        }
                    });
                    if (wells_results_array.length) {
                        well_filter_active = true;
                    }
                }
            }
            if (well_filter_active && wells_results_array.length) {
                self.plates[this.current_plate_index].filter_match = true;
                for (var i = 0; i < wells_results_array.length; i++) {
                    wells_results_array[i].filter_match = true;
                }
                self.well_result_count = wells_results_array.length;
            }
            self.selected_treatments = [];
            return resultsArray;
        },
        filters_active: function () {
            var filters = this.filters;
            for (var key of Object.keys(filters)) {
                if (filters[key] !== 'all') {
                    return true;
                }
            }
            return false;
        },
    },
});
