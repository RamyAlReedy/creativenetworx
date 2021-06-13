Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {

        var startClickInside = false;
        var isVisible = function () {
            !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )
        }

        var isVisible = function (elem) {
            if (elem && elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) {
                return true;
            }
            return false;
        }

        var mouseDownListener = function () {
            document.addEventListener('mousedown', function () {
                if (el.contains(event.target)) {
                    startClickInside = true;
                }
                else {
                    startClickInside = false;
                }
            });
        }

        var outsideClickListener = function() {
            if (!startClickInside && !el.contains(event.target) && isVisible(el)) {
              binding.value();
            }
        }

        var removeClickListener = function () {
            document.removeEventListener('mousedown', mouseDownListener);
            document.removeEventListener('mouseup', outsideClickListener);
            startClickInside = false;
        }

        document.addEventListener('mousedown', mouseDownListener);
        document.addEventListener('mouseup', outsideClickListener);
    }
});

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

            { id: 25, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 26, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 27, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 28, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 29, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 30, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 31, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 32, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 33, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 34, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 35, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 36, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 37, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 38, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 39, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 40, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 41, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 42, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 43, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 44, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 45, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 46, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '1 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 47, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '2 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 48, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '3 of 3', method: 'Method.1', condition_set: 'Condition.Set.2' },
        ],
        plates: [
            //{ id: 1, size: 384, name: 'Plate Name Goes Here', wells: [], filter_match: false, },
        ],
        last_plate_id_used: 0,
        add_plate_data: { id: -1, size: 0, name: '', wells: [], filter_match: false, },
        edit_plate_data: { id: -1, size: 0, name: '', wells: [], filter_match: false, },
        generate_plates_data: { plate_layout: {}, prefix: 'Plate - ' },
        current_plate_index: -1,
        selected_treatments: [],
        selected_wells: [],
        role_colors: {
            test_sample: '#ffcc32',
            ctrl_w_sample: '#0c0',
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
                name: '384',
                columns: 24,
                rows: 16,
            },
            96: {
                name: '96',
                columns: 12,
                rows: 8,
            },
            48: {
                name: '48',
                columns: 8,
                rows: 6,
            },
            24: {
                name: '24',
                columns: 6,
                rows: 4,
            },
        },
        plate_layouts: [
            {id: 1, name: 'Plate Layout 1', size: 384, 'recommended': true},
            {id: 2, name: 'Plate Layout 2', size: 96, 'recommended': true},
            {id: 3, name: 'Plate Layout 3', size: 48, 'recommended': false},
            {id: 4, name: 'Plate Layout 4', size: 24, 'recommended': false},
            {id: 5, name: 'Plate Layout 5', size: 384, 'recommended': false},
            {id: 6, name: 'Plate Layout 6', size: 96, 'recommended': false},
            {id: 7, name: 'Plate Layout 7', size: 48, 'recommended': false},
            {id: 8, name: 'Plate Layout 8', size: 24, 'recommended': false},
        ],
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
        highlight_by: '',
        shiftKeyPressed: false,
        ctrlKeyPressed: false,
    },
    created: function () {
        var self = this;
        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey || e.metaKey) {
                self.ctrlKeyPressed = true;
            }
            if (e.shiftKey) {
                self.shiftKeyPressed = true;
            }
        });
        document.addEventListener("keyup", function (e) {
            if (!e.ctrlKey && !e.metaKey) {
                self.ctrlKeyPressed = false;
            }
            if (!e.shiftKey) {
                self.shiftKeyPressed = false;
            }
        });
        window.addEventListener('resize', function () {
            self.ctrlKeyPressed = false;
            self.shiftKeyPressed = false;
        });
    },
    methods: {
        choose_layout: function (layout_id) {
            var plate_layout = this.getObjectByKey(this.plate_layouts, 'id', layout_id);
            if (plate_layout) {
                this.generate_plates_data.plate_layout = JSON.parse(JSON.stringify(plate_layout));
            }
            Figure.toggleDropdown('.fi-dropdown.fi-dropdown-open');
        },
        close_generate_plates: function () {
            this.generate_plates_data.plate_layout = { plate_layout: {}, prefix: 'Plate - ', };
        },
        regenerate_wells_for_plate: function (plate_id) {

            var option3 = jQuery('.option-3-container').length;

            var plate = this.getObjectByKey(this.plates, 'id', plate_id);
            if (plate) {
                plate.wells = [];
                for (var i = 0; i < plate.size; i++) {
                    var content = null;
                    if (option3) {
                        content = {sample_id: '', role: '', condition_set: '', method: '', replicate: '', rate: '',};
                    }
                    plate.wells.push({
                        id: i+1,
                        content: content,
                        filter_match: false,
                        highlight: false,
                    });
                }
            }
        },
        submit_add_plate: function () {
            if (this.add_plate_data.name && this.add_plate_data.size != 0) {
                this.last_plate_id_used++;
                this.add_plate_data.id = this.last_plate_id_used;
                this.plates.push(JSON.parse(JSON.stringify(this.add_plate_data)));
                this.regenerate_wells_for_plate(this.last_plate_id_used);

                this.current_plate_index = this.getObjectIndexByKey(this.plates, 'id', this.last_plate_id_used);

                Figure.modal('.add_plate_modal').hide();
            }
        },
        close_add_plate: function () {
            this.add_plate_data = { id: -1, size: 0, name: '', wells: [], filter_match: false, };
        },
        open_edit_plate: function (plate_id) {
            var plate = this.getObjectByKey(app.plates, 'id', plate_id);
            if (plate) {
                var plate_data = JSON.parse(JSON.stringify(plate));
                this.edit_plate_data = plate_data;
            }
        },
        submit_edit_plate: function () {
            if (this.edit_plate_data.name && this.edit_plate_data.size != 0) {
                var plate = this.getObjectByKey(app.plates, 'id', this.edit_plate_data.id);
                if (plate) {
                    plate.name = this.edit_plate_data.name;
                    if (plate.size != this.edit_plate_data.size) {
                        plate.size = this.edit_plate_data.size;
                        this.regenerate_wells_for_plate(plate.id);
                    }
                    else {
                        plate.size = this.edit_plate_data.size;
                    }
                }

                Figure.modal('.edit_plate_modal').hide();
            }
        },
        close_edit_plate: function () {
            this.edit_plate_data = { id: -1, size: 0, name: '', wells: [], filter_match: false, };
        },
        delete_plate: function (plate_index) {

            var self = this;

            Figure.confirm({
                message: 'Are you sure you want to delete this plate?',
                title: 'Delete Plate',
                onConfirm: function () {
                    self.plates.splice(plate_index, 1);
                    if (self.current_plate_index == plate_index && plate_index === self.plates.length || self.current_plate_index > plate_index) {
                        self.current_plate_index--;
                    }
                    self.$forceUpdate();
                },
                onCancel: function () {

                },
                okText: "Yes, I'm Sure",
                cancelText: "Cancel",
            });

        },
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
                var col_count = 0;
                for (var i = 0; i < this.selected_wells.length; i++) {
                    if (i !== this.selected_wells.length - 1) {
                        if (parseInt(this.selected_wells[i]) > this.plate_sizes[this.plates[this.current_plate_index].size].columns) {
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
            return {
                row: letter,
                column: number,
            };
        },
        current_selection_sorted: function (selection) {
            return selection.sort(function(a,b){
                return parseInt(a) - parseInt(b);
            });
        },
        new_selection_sorted: function (selection) {
            return selection.concat().sort();
        },
        selection: function (new_selection) {
            if (this.shiftKeyPressed) {
                var first_item = parseInt(this.current_selection_sorted(this.selected_wells)[0]);
                var last_item = parseInt(this.new_selection_sorted(new_selection)[new_selection.length-1]);
                var range = last_item - first_item + 1;
                this.selected_wells = [];
                for (var i = 0; i < range; i++) {
                    this.selected_wells.push(first_item.toString());
                    first_item = parseInt(first_item) + 1;
                }
            }
            else if (this.ctrlKeyPressed) {
                for (var i = 0; i < new_selection.length; i++) {
                    var existingIndex = this.selected_wells.indexOf(new_selection[i]);
                    if (existingIndex > -1) {
                        this.selected_wells.splice(existingIndex, 1);
                    }
                    else {
                        this.selected_wells.push(new_selection[i]);
                    }
                }
            }
            else {
                this.selected_wells = new_selection;
            }
        },
        well_mouseover: function (id) {
            var columns = this.plate_sizes[this.plates[this.current_plate_index].size].columns;
            var row_index = Math.floor((parseInt(id)-1)/columns);
            var column_index = parseInt(id) - (columns * Math.floor( parseInt(id)/columns )) - 1;
            if (column_index < 0) {
                column_index = parseInt(id) / Math.floor( parseInt(id)/columns ) - 1;
            }
            jQuery('.plate-columns .plate-column').eq(column_index).addClass('hover');
            jQuery('.plate-rows .plate-row').eq(row_index).addClass('hover');
        },
        well_mouseout: function (id) {
            jQuery('.plate-columns .plate-column').removeClass('hover');
            jQuery('.plate-rows .plate-row').removeClass('hover');
        },
        select_all_treatments: function () {
            this.selected_treatments = [];
            for (var i = 0; i < this.treatments_filtered_list.length; i++) {
                this.selected_treatments.push(this.treatments_filtered_list[i].id.toString());
            }
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
            this.$nextTick(function () {
                this.selected_treatments = [];
                this.selected_wells = [];
            });
        },
        place_across: function () {
            this.current_selection_sorted(this.selected_wells);
            this.place_series(this.selected_wells);
        },
        place_down: function () {
            // var column_count = this.get_column_count();
            // var row_count = this.selected_wells.length / columns;
            // var columns = [];
            // for (var i = 0; i < column_count; i++) {
            //     columns.push([]);
            // }
            // var column_index = 0;
            // for (var i = 0; i < this.selected_wells.length; i++) {
            //     columns[column_index].push(this.selected_wells[i]);
            //     if (column_index === column_count - 1) {
            //         column_index = 0;
            //     }
            //     else {
            //         column_index++;
            //     }
            // }
            // var down_array = [].concat.apply([], columns);

            this.current_selection_sorted(this.selected_wells);

            var down_array = [];
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well_location = this.get_well_location(this.selected_wells[i]);
                down_array.push({
                    id: this.selected_wells[i],
                    location: well_location.column + '' + well_location.row,
                });
            }

            var reA = /[^0-9]/g;
            var reN = /[^a-zA-Z]/g;

            down_array.sort(function (a, b) {
                var aA = parseInt(a.location.replace(reA, ""), 10);
                var bA = parseInt(b.location.replace(reA, ""), 10);
                if (aA === bA) {
                    var aN = a.location.replace(reN, "");
                    var bN = b.location.replace(reN, "");
                    return aN === bN ? 0 : aN > bN ? 1 : -1;
                }
                return aA > bA ? 1 : -1;
            });

            var result_down_array = [];

            for (var i = 0; i < down_array.length; i++) {
                result_down_array.push(down_array[i].id);
            }

            this.place_series(result_down_array);
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
            var option3 = jQuery('.option-3-container').length;
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', this.selected_wells[i]);
                var content = null;
                if (option3) {
                    content = {sample_id: '', role: '', condition_set: '', method: '', replicate: '', rate: '',};
                }
                if (well.content) {
                    var treatment = this.getObjectByKey(this.treatments, 'id', well.content);
                    if (treatment) {
                        treatment.place = null;
                    }
                    well.content = content;
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
                    if (self.add_content.condition_set && self.add_content.sample_id && self.add_content.rate || well.content.condition_set && well.content.sample_id && well.content.rate) {
                        well.content.replicate = (i+1) + ' of ' + self.selected_wells.length;
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
        tooltip_class: function (well_id) {
            var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', well_id);
            if (well.content.role === 'test_sample' && well.content.sample_id && well.content.rate || well.content.role === 'ctrl_w_sample' && well.content.sample_id && well.content.rate || well.content.role === 'ctrl_wo_sample' && well.content.sample_id || well.content.role === 'empty' || well.content === 'blank') {
                return 'complete';
            }
            else {
                return 'not-complete';
            }
        },
        highlight: function(type) {
            this.selected_wells = [];
            this.reset_highlight();
            for (var i = 0; i < this.plates[this.current_plate_index].wells.length; i++) {
                var well = this.plates[this.current_plate_index].wells[i];
                var well_content = well.content;
                if (type === 'empty' && well_content === 'blank') {
                    well.highlight = true;
                    this.highlight_by = type;
                }
                else {
                    var treatement_id = parseInt(well_content);
                    var treatment = this.getObjectByKey(this.treatments, 'id', treatement_id);

                    var option3 = jQuery('.option-3-container').length;
                    if (option3) {
                        treatment = well_content;
                    }

                    if (treatment) {
                        if (type === treatment.role) {
                            well.highlight = true;
                            this.highlight_by = type;
                        }
                    }
                }
            }
        },
        reset_highlight: function () {
            for (var i = 0; i < this.plates[this.current_plate_index].wells.length; i++) {
                this.plates[this.current_plate_index].wells[i].highlight = false;
            }
            this.highlight_by = '';
        },
        select_deselect_column: function (id) {
            var columns = this.plate_sizes[this.plates[this.current_plate_index].size].columns;
            var rows = this.plate_sizes[this.plates[this.current_plate_index].size].rows;

            var well_ids = [id.toString()];

            for (var i = 0; i < rows - 1; i++) {
                id = parseInt(id) + columns;
                well_ids.push(id.toString());
            }

            for (var i = 0; i < well_ids.length; i++) {
                var id_index = this.selected_wells.indexOf(well_ids[i]);
                if (id_index > -1) {
                    this.selected_wells.splice(id_index, 1);
                }
                else {
                    this.selected_wells.push(well_ids[i]);
                }
            }
        },
        select_deselect_row: function (id) {

            var columns = this.plate_sizes[this.plates[this.current_plate_index].size].columns;
            var rows = this.plate_sizes[this.plates[this.current_plate_index].size].rows;

            var id = columns * id - columns + 1;

            var well_ids = [id.toString()];

            for (var i = 0; i < columns - 1; i++) {
                id = parseInt(id) + 1;
                well_ids.push(id.toString());
            }

            for (var i = 0; i < well_ids.length; i++) {
                var id_index = this.selected_wells.indexOf(well_ids[i]);
                if (id_index > -1) {
                    this.selected_wells.splice(id_index, 1);
                }
                else {
                    this.selected_wells.push(well_ids[i]);
                }
            }
        },
        render_tooltip_content: function (well_id) {
            var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', well_id);
            var well_content = well.content;

            var well_location = this.get_well_location(well_id);

            if (well_content === 'blank') {
                return `
                <ul class='fi-list well-info-content'>
                    <li><strong class='label'>Location:</strong> ` + well_location.row + `-` + well_location.column + `</li>
                    <li><strong class='label'>Role:</strong> Empty</li>
                </ul>
                `;
            }
            else {
                var treatement_id = parseInt(well_content);

                var option3 = jQuery('.option-3-container').length;

                var treatment = this.getObjectByKey(this.treatments, 'id', treatement_id);

                if (option3) {
                    treatment = well_content;
                }

                if (treatment) {
                    var role = treatment.role;
                    var sample_id = treatment.sample_id;
                    var rate = treatment.rate;
                    var condition_set = treatment.condition_set;
                    var replicate = treatment.replicate;
                    var method = treatment.method;

                    if (role === 'empty') {
                        role = 'Empty';
                    }
                    else if (role === 'test_sample') {
                        role = "<span class='color-key'><span class='circle' style='background-color: " + this.role_colors['test_sample'] + "'></span>Test Sample</span>";
                    }
                    else if (role === 'ctrl_w_sample') {
                        role = "<span class='color-key'><span class='circle' style='background-color: " + this.role_colors['ctrl_w_sample'] + "'></span>Control with Sample</span>";
                    }
                    else if (role === 'ctrl_wo_sample') {
                        role = "<span class='color-key'><span class='circle' style='background-color: " + this.role_colors['ctrl_wo_sample'] + "'></span>Control without Sample</span>";
                    }

                    if (!role) {
                        role = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!sample_id) {
                        sample_id = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!rate) {
                        rate = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!condition_set) {
                        condition_set = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!replicate) {
                        replicate = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!method) {
                        method = "<span class='fi-text-danger'>Not set</span>";
                    }

                    return `
                    <ul class='fi-list well-info-content'>
                        <li><strong class='label'>Location:</strong> ` + well_location.row + `-` + well_location.column + `</li>
                        <li><strong class='label'>Sample ID:</strong> ` + sample_id + `</li>
                        <li><strong class='label'>Role:</strong> ` + role + `</li>
                        ` + ( treatment.role === 'test_sample' || treatment.role === 'ctrl_w_sample' ? `
                        <li><strong class='label'>Rate:</strong> ` + rate + `</li>
                        ` : `` ) + `
                        <li><strong class='label'>Condition Set:</strong> ` + condition_set + `</li>
                        ` + ( treatment.condition_set && treatment.sample_id && treatment.rate ? `<li><strong class='label'>Replicate:</strong> ` + replicate + `</li>
                        ` : `` ) + `
                        <li><strong class='label'>Method:</strong> ` + method + `</li>
                    </ul>
                    `;
                }
            }
        },
    },
    computed: {
        treatments_filtered_list: function () {
            var self = this;
            var resultsArray = self.treatments;
            if (self.current_plate_index > -1) {
                var wellsArray = self.plates[self.current_plate_index].wells;
                if (wellsArray.length) {
                    for (var i = 0; i < wellsArray.length; i++) {
                        wellsArray[i].filter_match = false;
                    }
                }
                var wells_results_array = wellsArray;
                var well_filter_active = false;
                self.plates[this.current_plate_index].filter_match = false;
            }

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
                    if (self.current_plate_index > -1) {
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
            }
            if (self.current_plate_index > -1 && well_filter_active && wells_results_array.length) {
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
        tooltip_offset: function () {
            if (this.plates[this.current_plate_index].size >= 384) {
                return -4
            }
            else {
                return -8;
            }
        },
    },
});

var last_col_index = -1;
var last_row_index = -1;
jQuery(document).on('click', '.plate-column', function () {
    jQuery(this).toggleClass('selected');
    jQuery(this).closest('.plate-container').find('.plate-row').removeClass('selected');
    jQuery(this).siblings('.plate-column').removeClass('selected');
    var this_index = jQuery(this).index();
    if (last_col_index !== this_index) {
        app.selected_wells = [];
    }
    last_col_index = this_index;
    last_row_index = -1;
    app.select_deselect_column(this_index + 1);
});
jQuery(document).on('click', '.plate-row', function () {
    jQuery(this).toggleClass('selected');
    jQuery(this).closest('.plate-container').find('.plate-column').removeClass('selected');
    jQuery(this).siblings('.plate-row').removeClass('selected');
    var this_index = jQuery(this).index();
    if (last_row_index !== this_index) {
        app.selected_wells = [];
    }
    last_row_index = this_index;
    last_col_index = -1;
    app.select_deselect_row(this_index + 1);
});

jQuery(document).on('fi-modal:hidden', '.add_plate_modal', function () {
    app.close_add_plate();
});
jQuery(document).on('fi-modal:hidden', '.edit_plate_modal', function () {
    app.close_edit_plate();
});

jQuery(document).on('fi-modal:hidden', '.generate_plates_modal', function () {
    app.close_generate_plates();
});

jQuery(document).on('fi-dropdown:shown', '.choose-layout', function () {
    jQuery(this).find('.fi-search input[type]').focus();
});

jQuery(document).on('mousedown', function (e) {
    if (jQuery(e.target).is('.plate-container .drag-select-container')) {
        app.selected_wells = [];
    }
});
