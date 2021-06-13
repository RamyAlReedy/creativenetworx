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

Vue.mixin( {
    data: function () {
        return {
            // sample_color_palatte: [
            //     '#1e2493', '#2a2f9c', '#373ba4', '#4548ad', '#5456b5', '#6365bd', '#7375c5', '#8384cd', '#9495d5', '#a5a6dc', '#b6b7e4', '#c7c7ec', '#d7d7f2', '#e6e6f9', '#f2f2fe',
            //     '#1e4b20', '#285a28', '#316932', '#3a773c', '#468547', '#539354', '#61a162', '#70ae70', '#80bb80', '#92c890', '#a5d5a2', '#b7e1b4', '#caecc6', '#dcf6d9', '#ebfee8',
            //     '#d7782d', '#da8234', '#dd8b3e', '#df9449', '#e29e57', '#e5a666', '#e8b076', '#ebba85', '#eec294', '#f1cca4', '#f3d5b3', '#f6dec2', '#f9e5d0', '#fbecdd', '#fdf2e7',
            //     '#461393', '#4f1b9c', '#5a25a3', '#6531ac', '#703fb4', '#7e4ebc', '#8a5ec5', '#976fcd', '#a580d4', '#b293dc', '#bfa5e3', '#cdb7eb', '#dac8f2', '#e6d9f8', '#f0e7fd',
            //     '#8c1a11', '#952319', '#9c2e24', '#a53c30', '#ad4c3e', '#b65d4e', '#be6f5e', '#c7806f', '#cf9281', '#d8a393', '#e0b5a6', '#e8c5b7', '#f0d5c9', '#f7e4d9', '#fceee7',
            //     '#ea3323', '#ea3825', '#eb4328', '#eb522c', '#ec6331', '#ed7336', '#ef853c', '#f19743', '#f2a84a', '#f4b952', '#f7c95b', '#f9d965', '#fbe772', '#fdf484', '#fffed1',
            //     '#4aa22e', '#53aa33', '#64b339', '#79ba3f', '#91c148', '#a9c951', '#c1cf5c', '#d7d668', '#dacb72', '#ddc37f', '#e0be8e', '#e4be9f', '#e7c4b4', '#ecd1cc', '#f2f2f2',
            // ],
            // rate_color_palatte: [
            //     '#8c1a11', '#952319', '#9c2e24', '#a53c30', '#ad4c3e', '#b65d4e', '#be6f5e', '#c7806f', '#cf9281', '#d8a393', '#e0b5a6', '#e8c5b7', '#f0d5c9', '#f7e4d9', '#fceee7',
            //     '#ea3323', '#ea3825', '#eb4328', '#eb522c', '#ec6331', '#ed7336', '#ef853c', '#f19743', '#f2a84a', '#f4b952', '#f7c95b', '#f9d965', '#fbe772', '#fdf484', '#fffed1',
            //     '#4aa22e', '#53aa33', '#64b339', '#79ba3f', '#91c148', '#a9c951', '#c1cf5c', '#d7d668', '#dacb72', '#ddc37f', '#e0be8e', '#e4be9f', '#e7c4b4', '#ecd1cc', '#f2f2f2',
            //     '#1e2493', '#2a2f9c', '#373ba4', '#4548ad', '#5456b5', '#6365bd', '#7375c5', '#8384cd', '#9495d5', '#a5a6dc', '#b6b7e4', '#c7c7ec', '#d7d7f2', '#e6e6f9', '#f2f2fe',
            //     '#1e4b20', '#285a28', '#316932', '#3a773c', '#468547', '#539354', '#61a162', '#70ae70', '#80bb80', '#92c890', '#a5d5a2', '#b7e1b4', '#caecc6', '#dcf6d9', '#ebfee8',
            //     '#d7782d', '#da8234', '#dd8b3e', '#df9449', '#e29e57', '#e5a666', '#e8b076', '#ebba85', '#eec294', '#f1cca4', '#f3d5b3', '#f6dec2', '#f9e5d0', '#fbecdd', '#fdf2e7',
            //     '#461393', '#4f1b9c', '#5a25a3', '#6531ac', '#703fb4', '#7e4ebc', '#8a5ec5', '#976fcd', '#a580d4', '#b293dc', '#bfa5e3', '#cdb7eb', '#dac8f2', '#e6d9f8', '#f0e7fd',
            // ],
            sample_color_palatte: [
                '#1e2493', '#5456b5', '#9495d5', '#d7d7f2',
                '#1e4b20', '#468547', '#80bb80', '#caecc6',
                '#d7782d', '#e29e57', '#eec294', '#f9e5d0',
                '#461393', '#703fb4', '#a580d4', '#dac8f2',
                '#8c1a11', '#ad4c3e', '#cf9281', '#f0d5c9',
                '#ea3323', '#ec6331', '#f2a84a', '#fbe772',
                '#4aa22e', '#91c148', '#dacb72', '#e7c4b4',
            ],
            rate_color_palatte: [
                '#d7782d', '#e29e57', '#eec294', '#f9e5d0',
                '#461393', '#703fb4', '#a580d4', '#dac8f2',
                '#8c1a11', '#ad4c3e', '#cf9281', '#f0d5c9',
                '#ea3323', '#ec6331', '#f2a84a', '#fbe772',
                '#4aa22e', '#91c148', '#dacb72', '#e7c4b4',
                '#1e2493', '#5456b5', '#9495d5', '#d7d7f2',
                '#1e4b20', '#468547', '#80bb80', '#caecc6',
            ],
            condition_set_color_palatte: [
                '#8c1a11', '#ad4c3e', '#cf9281', '#f0d5c9',
                '#ea3323', '#ec6331', '#f2a84a', '#fbe772',
                '#4aa22e', '#91c148', '#dacb72', '#e7c4b4',
                '#1e2493', '#5456b5', '#9495d5', '#d7d7f2',
                '#1e4b20', '#468547', '#80bb80', '#caecc6',
                '#d7782d', '#e29e57', '#eec294', '#f9e5d0',
                '#461393', '#703fb4', '#a580d4', '#dac8f2',
            ],
            replicate_color_palatte: [
                '#4aa22e', '#91c148', '#dacb72', '#e7c4b4',
                '#1e2493', '#5456b5', '#9495d5', '#d7d7f2',
                '#1e4b20', '#468547', '#80bb80', '#caecc6',
                '#d7782d', '#e29e57', '#eec294', '#f9e5d0',
                '#461393', '#703fb4', '#a580d4', '#dac8f2',
                '#8c1a11', '#ad4c3e', '#cf9281', '#f0d5c9',
                '#ea3323', '#ec6331', '#f2a84a', '#fbe772',
            ],
        }
    },
});


//ACTIVATE ACCOUNT APP
var create_app = new Vue({
    el: '#create_app',
    data: {
        layout_mode: 'roles',
        role_value: 'test_sample',
        sample_value: 1,
        rate_value: 1,
        condition_set_value: 1,
        replicate_value: 1,
        layout: { name: 'Layout Name Goes Here', size: 384, wells: [], },
        selected_treatments: [],
        selected_wells: [],
        role_colors: {
            test_sample: '#ffcc32',
            ctrl_w_sample: '#0c0',
            ctrl_wo_sample: '#ff3302',
            empty: '#333',
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
        well_row_letters: {
            0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P',
        },
        samples: [],
        rates: [],
        condition_sets: [],
        replicates: [],
        current_sample_shade: -0.8,
        current_rate_shade: -0.8,
        sample_color_index: 0,
        rate_color_index: 0,
        condition_set_color_index: 0,
        replicate_color_index: 0,
        highlight_by: '',
        highlight_id: 0,
        shiftKeyPressed: false,
        ctrlKeyPressed: false,
        auto_set_data: {
            starting_number: 1,
            direction: 'across',
        },
    },
    watch: {
        layout_size: function () {
            this.clear_plate();
            this.layout.wells = [];
            for (var i = 0; i < this.layout.size; i++) {
                var content = null;
                this.layout.wells.push({
                    id: i+1,
                    content: {
                        role: '',
                        sample: '',
                        rate: '',
                        condition_set: '',
                        replicate: '',
                    },
                    highlight: false,
                });
            }
        },
        layout: {
            deep: true,
            handler: function (newData) {
                for (var i = 0; i < this.samples.length; i++) {
                    if (!this.count_wells_by_sample(this.samples[i].id)) {
                        this.samples.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.samples.length) {
                    this.sample_color_index = 0;
                }
                for (var i = 0; i < this.rates.length; i++) {
                    if (!this.count_wells_by_rate(this.rates[i].id)) {
                        this.rates.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.rates.length) {
                    this.rate_color_index = 0;
                }
                for (var i = 0; i < this.condition_sets.length; i++) {
                    if (!this.count_wells_by_condition_set(this.condition_sets[i].id)) {
                        this.condition_sets.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.condition_sets.length) {
                    this.condition_set_color_index = 0;
                }
                for (var i = 0; i < this.replicates.length; i++) {
                    if (!this.count_wells_by_replicate(this.replicates[i].id)) {
                        this.replicates.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.replicates.length) {
                    this.replicate_color_index = 0;
                }
            },
        },
    },
    created: function () {
        for (var i = 0; i < this.layout.size; i++) {
            var content = null;
            this.layout.wells.push({
                id: i+1,
                content: {
                    role: '',
                    sample: '',
                    rate: '',
                    condition_set: '',
                    replicate: '',
                },
                highlight: false,
            });
        }
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
        hexToRgb: function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            result = result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
            return 'rgb(' + result.r + ',' + result.g + ',' + result.b + ')';
        },
        shadeRGBColor: function (color, percent) {
            var f = color.split(","), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = parseInt(f[0].slice(4)), G = parseInt(f[1]), B = parseInt(f[2]);
            return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
        },
        rgb2hex: function (color_value) {
            if (!color_value) return false;
            var parts = color_value.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/),
                length = color_value.indexOf('rgba') ? 3 : 2; // Fix for alpha values
            delete (parts[0]);
            for (var i = 1; i <= length; i++) {
                parts[i] = parseInt(parts[i]).toString(16);
                if (parts[i].length == 1) parts[i] = '0' + parts[i];
            }
            return '#' + parts.join('').toUpperCase();
        },
        ShadeHexColor: function (color, percent) {
            return this.rgb2hex(this.shadeRGBColor(this.hexToRgb(color), percent));
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
        get_column_count: function () {
            if (this.selected_wells.length) {
                // var col_count = 1;
                // for (var i = 0; i < this.selected_wells.length; i++) {
                //     if (i !== this.selected_wells.length - 1) {
                //         if (parseInt(this.selected_wells[i+1]) > parseInt(this.selected_wells[i]) + 1 || i == this.plate_sizes[this.layout.size].columns - 1) {
                //             break;
                //         }
                //         else {
                //             col_count++;
                //         }
                //     }
                // }
                // return col_count;

                var col_count = 0;
                for (var i = 0; i < this.selected_wells.length; i++) {
                    if (i !== this.selected_wells.length - 1) {
                        if (parseInt(this.selected_wells[i]) > this.plate_sizes[this.layout.size].columns) {
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
            var columns = this.plate_sizes[this.layout.size].columns;
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
        check_selection: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well_role = this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content.role;
                if (
                    this.layout_mode === 'samples' && (!well_role || well_role === 'empty')
                    ||
                    this.layout_mode === 'rates' && (!well_role || well_role === 'empty' || well_role === 'ctrl_wo_sample')
                    ||
                    this.layout_mode === 'condition_sets' && (!well_role || well_role === 'empty')
                    ||
                    this.layout_mode === 'replicates' && (!well_role || well_role === 'empty')
                ) {
                    this.selected_wells.splice(i, 1);
                    i--;
                }
            }
        },
        add_update_content: function (well_id, type, value) {
            var plural = type + 's';
            if (!this.getObjectByKey(this[plural], 'id', value)) {
                this[plural].push({
                    id: value,
                    color: this[type + '_color_palatte'][this[type + '_color_index']],
                });
                if (this[type + '_color_index'] == this[type + '_color_palatte'].length - 1) {
                    this[type + '_color_index'] = 0;
                }
                else {
                    this[type + '_color_index']++;
                }
            }
            this.getObjectByKey(this.layout.wells, 'id', well_id).content[type] = value;
        },
        set: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                if (this.layout_mode === 'roles') {
                    this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content.role = this.role_value;
                    if (this.role_value === 'ctrl_wo_sample' || this.role_value === 'empty') {
                        this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content.sample = '';
                        this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content.rate = '';
                    }
                }
                else if (this.layout_mode === 'samples') {
                    this.add_update_content(this.selected_wells[i], 'sample', this.sample_value);
                }
                else if (this.layout_mode === 'rates') {
                    this.add_update_content(this.selected_wells[i], 'rate', this.rate_value);
                }
                else if (this.layout_mode === 'condition_sets') {
                    this.add_update_content(this.selected_wells[i], 'condition_set', this.condition_set_value);
                }
                else if (this.layout_mode === 'replicates') {
                    this.add_update_content(this.selected_wells[i], 'replicate', this.replicate_value);
                }
            }
            this.selected_wells = [];
        },
        unset: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                if (this.layout_mode === 'roles') {
                    this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content = {
                        role: '',
                        sample: '',
                        rate: '',
                        condition_set: '',
                        replicate: '',
                    };
                }
                else if (this.layout_mode === 'samples') {
                    this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content.sample = '';
                }
                else if (this.layout_mode === 'rates') {
                    this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content.rate = '';
                }
                else if (this.layout_mode === 'condition_sets') {
                    this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content.condition_set = '';
                }
                else if (this.layout_mode === 'replicates') {
                    this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content.replicate = '';
                }
            }
            this.selected_wells = [];
        },
        well_mouseover: function (id) {
            var columns = this.plate_sizes[this.layout.size].columns;
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
        open_auto_set: function () {
            if (this.layout_mode === 'samples') {
                this.auto_set_data.starting_number = this.sample_value;
            }
            else if (this.layout_mode === 'rates') {
                this.auto_set_data.starting_number = this.rate_value;
            }
            else if (this.layout_mode === 'condition_sets') {
                this.auto_set_data.starting_number = this.condition_set_value;
            }
            else if (this.layout_mode === 'replicates') {
                this.auto_set_data.starting_number = this.replicate_value;
            }
        },
        auto_set_series: function (array) {
            var content_type = '';
            if (this.layout_mode === 'samples') {
                content_type = 'sample';
            }
            else if (this.layout_mode === 'rates') {
                content_type = 'rate';
            }
            if (this.layout_mode === 'condition_sets') {
                content_type = 'condition_set';
            }
            if (this.layout_mode === 'replicates') {
                content_type = 'replicate';
            }
            var starting_number = this.auto_set_data.starting_number;
            for (var i = 0; i < array.length; i++) {
                this.add_update_content(array[i], content_type, starting_number);
                starting_number++;
            }
            this.$nextTick(function () {
                this.selected_wells = [];
            });
        },
        auto_set_across: function () {
            this.auto_set_series(this.selected_wells);
        },
        auto_set_down: function () {
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

            this.auto_set_series(result_down_array);
        },
        submit_auto_set: function () {

            this.current_selection_sorted(this.selected_wells);

            if (this.auto_set_data.direction === 'across') {
                this.auto_set_across();
            }
            else if (this.auto_set_data.direction === 'down') {
                this.auto_set_down();
            }
            Figure.modal('.auto_set_modal').hide();
        },
        close_auto_set: function () {
            this.auto_set_data.starting_number = 1;
            this.auto_set_data.direction = 'across';
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
            for (var i = 0; i < this.layout.wells.length; i++) {
                this.layout.wells[i].content = {
                    role: '',
                    sample: '',
                    rate: '',
                    condition_set: '',
                    replicate: '',
                };
            }
            this.layout_mode = 'roles';
            this.selected_wells = [];
            this.samples = [];
            this.rates = [];
            this.condition_sets = [];
            this.replicates = [];
            this.role_value = 'test_sample';
            this.sample_value = 1;
            this.rate_value = 1;
            this.condition_set_value = 1;
            this.replicate_value = 1;
            this.current_sample_shade = -0.8;
            this.current_rate_shade = -0.8;
            this.sample_color_index = 0;
            this.rate_color_index = 0;
            this.condition_set_color_index = 0;
            this.replicate_color_index = 0;
            this.highlight_by = '';
            this.highlight_id = 0;
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
        count_wells_by_sample: function (number) {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.sample == number);
            }, 0);
        },
        count_wells_by_rate: function (number) {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.rate == number);
            }, 0);
        },
        count_wells_by_condition_set: function (number) {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.condition_set == number);
            }, 0);
        },
        count_wells_by_replicate: function (number) {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.replicate == number);
            }, 0);
        },
        render_tooltip_content: function (well_id) {
            var well_content = this.getObjectByKey(this.layout.wells, 'id', well_id).content;
            var role = well_content.role;
            var sample = well_content.sample;
            var rate = well_content.rate;
            var condition_set = well_content.condition_set;
            var replicate = well_content.replicate;

            if (!role) {
                role = 'Unset';
            }
            else if (role === 'empty') {
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

            if (!sample) {
                sample = "<span class='fi-text-danger'>Not set</span>";
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

            var well_location = this.get_well_location(well_id);

            return `
            <ul class='fi-list well-info-content'>
                <li><strong class='label'>Location:</strong> ` + well_location.row + `-` + well_location.column + `</li>
                <li><strong class='label'>Role:</strong> ` + role + `</li>
                ` + ( well_content.role !== 'empty' ? `
                <li><strong class='label'>Sample #:</strong> ` + sample + `</li>
                ` : `` ) + `
                ` + ( well_content.role === 'test_sample' || well_content.role === 'ctrl_w_sample' ? `
                <li><strong class='label'>Rate #:</strong> ` + rate + `</li>
                ` : `` ) + `
                ` + ( well_content.role !== 'empty' ? `
                <li><strong class='label'>Condition Set #:</strong> ` + condition_set + `</li>
                ` : `` ) + `
                ` + ( well_content.role !== 'empty' ? `
                <li><strong class='label'>Replicate #:</strong> ` + replicate + `</li>
                ` : `` ) + `
            </ul>
            `;
        },
        tooltip_class: function (well_id) {
            var well = this.getObjectByKey(this.layout.wells, 'id', well_id);
            if (
                well.content.role === 'test_sample' && well.content.sample && well.content.rate && well.content.condition_set && well.content.replicate
                ||
                well.content.role === 'ctrl_w_sample' && well.content.sample && well.content.rate && well.content.condition_set && well.content.replicate
                ||
                well.content.role === 'ctrl_wo_sample' && well.content.sample && well.content.condition_set && well.content.replicate
                ||
                well.content.role === 'empty'
            ) {
                return 'complete';
            }
            else {
                return 'not-complete';
            }
        },
        highlight: function(type, id) {
            this.selected_wells = [];
            this.reset_highlight();
            for (var i = 0; i < this.layout.wells.length; i++) {
                var well = this.layout.wells[i];
                if (type === 'role_not_set' && this.unset_count) {
                    if (!well.content.role) {
                        well.highlight = true;
                        this.highlight_by = type;
                    }
                }
                else if (type === 'empty' && this.empty_count) {
                    if (well.content.role === 'empty') {
                        well.highlight = true;
                        this.highlight_by = type;
                    }
                }
                else if (type === 'test_sample' && this.test_sample_count) {
                    if (well.content.role === 'test_sample') {
                        well.highlight = true;
                        this.highlight_by = type;
                    }
                }
                else if (type === 'ctrl_w_sample' && this.ctrl_w_sample_count) {
                    if (well.content.role === 'ctrl_w_sample') {
                        well.highlight = true;
                        this.highlight_by = type;
                    }
                }
                else if (type === 'ctrl_wo_sample' && this.ctrl_wo_sample_count) {
                    if (well.content.role === 'ctrl_wo_sample') {
                        well.highlight = true;
                        this.highlight_by = type;
                    }
                }
                else if (type === 'sample_not_set' && this.sample_not_set_count) {
                    if (!well.content.sample && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample')) {
                        well.highlight = true;
                        this.highlight_by = type;
                    }
                }
                else if (type === 'sample' && id) {
                    if (well.content.sample == id) {
                        well.highlight = true;
                        this.highlight_by = type;
                        this.highlight_id = id;
                    }
                }
                else if (type === 'rate_not_set' && this.rate_not_set_count) {
                    if (!well.content.rate && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample')) {
                        well.highlight = true;
                        this.highlight_by = type;
                    }
                }
                else if (type === 'rate' && id) {
                    if (well.content.rate == id) {
                        well.highlight = true;
                        this.highlight_by = type;
                        this.highlight_id = id;
                    }
                }
                else if (type === 'condition_set_not_set' && this.condition_set_not_set_count) {
                    if (!well.content.condition_set && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample')) {
                        well.highlight = true;
                        this.highlight_by = type;
                    }
                }
                else if (type === 'condition_set' && id) {
                    if (well.content.condition_set == id) {
                        well.highlight = true;
                        this.highlight_by = type;
                        this.highlight_id = id;
                    }
                }
                else if (type === 'replicate_not_set' && this.replicate_not_set_count) {
                    if (!well.content.replicate && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample')) {
                        well.highlight = true;
                        this.highlight_by = type;
                    }
                }
                else if (type === 'replicate' && id) {
                    if (well.content.replicate == id) {
                        well.highlight = true;
                        this.highlight_by = type;
                        this.highlight_id = id;
                    }
                }
            }
        },
        reset_highlight: function () {
            for (var i = 0; i < this.layout.wells.length; i++) {
                this.layout.wells[i].highlight = false;
            }
            this.highlight_by = '';
            this.highlight_id = 0;
        },
        select_deselect_column: function (id) {
            var columns = this.plate_sizes[this.layout.size].columns;
            var rows = this.plate_sizes[this.layout.size].rows;

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

            var columns = this.plate_sizes[this.layout.size].columns;
            var rows = this.plate_sizes[this.layout.size].rows;

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
        save_layout: function () {
            if (this.layout.size - this.count_placed_wells) {
                Figure.dialog({
                    title: `<i class="far fa-exclamation-triangle fi-icon-margin fi-text-danger"></i>Can't Save Layout`,
                    message: `
                    <p><strong>There are wells that are unset or incomplete.</strong></p>
                    <p>Unneeded wells can be set to empty. Otherwise, please make sure the following rules are met:</p>
                    <ul>
                        <li>Test Samples and Controls with Samples must have Sample #s and Rates #s</li>
                        <li>Controls without Samples must have Sample #s</li>
                        <li>All wells (except for empty ones) must have Condition Set #s and Replicate #s</li>
                    </ul>
                    `,
                    okText: 'OK',
                });
            }
            else {
                Figure.notify('<div class="notify-content"><i class="notify-icon fa fa-check-circle fi-text-success"></i> Layout saved successfully</div>');
            }
        },
    },
    computed: {
        layout_size: function () {
            return this.layout.size;
        },
        tooltip_offset: function () {
            if (this.layout.size >= 384) {
                return -4
            }
            else {
                return -8;
            }
        },
        sorted_samples: function () {
            return this.samples.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        sorted_rates: function () {
            return this.rates.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        sorted_condition_sets: function () {
            return this.condition_sets.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        sorted_replicates: function () {
            return this.replicates.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        count_placed_wells: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (
                    well.content.role === 'test_sample' && well.content.sample !== '' && well.content.rate !== '' && well.content.condition_set !== '' && well.content.replicate !== ''
                    ||
                    well.content.role === 'ctrl_w_sample' && well.content.sample !== '' && well.content.rate !== '' && well.content.condition_set !== '' && well.content.replicate !== ''
                    ||
                    well.content.role === 'ctrl_wo_sample' && well.content.sample !== '' && well.content.condition_set !== '' && well.content.replicate !== ''
                    ||
                    well.content.role === 'empty'
                );
            }, 0);
        },
        unset_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.role);
            }, 0);
        },
        empty_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.role === 'empty');
            }, 0);
        },
        test_sample_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.role === 'test_sample');
            }, 0);
        },
        ctrl_w_sample_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.role === 'ctrl_w_sample');
            }, 0);
        },
        ctrl_wo_sample_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.role === 'ctrl_wo_sample');
            }, 0);
        },
        sample_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.sample && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample'));
            }, 0);
        },
        rate_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.rate && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample'));
            }, 0);
        },
        condition_set_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.condition_set && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample'));
            }, 0);
        },
        replicate_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.replicate && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample'));
            }, 0);
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
        create_app.selected_wells = [];
    }
    last_col_index = this_index;
    last_row_index = -1;
    create_app.select_deselect_column(this_index + 1);
});
jQuery(document).on('mousedown', function (e) {
    if (jQuery(e.target).is('.plate-container .drag-select-container')) {
        create_app.selected_wells = [];
    }
});
jQuery(document).on('click', '.plate-row', function () {
    jQuery(this).toggleClass('selected');
    jQuery(this).closest('.plate-container').find('.plate-column').removeClass('selected');
    jQuery(this).siblings('.plate-row').removeClass('selected');
    var this_index = jQuery(this).index();
    if (last_row_index !== this_index) {
        create_app.selected_wells = [];
    }
    last_row_index = this_index;
    last_col_index = -1;
    create_app.select_deselect_row(this_index + 1);
});

jQuery(document).on('fi-modal:hidden', '.auto_set_modal', function () {
    create_app.close_auto_set();
});
